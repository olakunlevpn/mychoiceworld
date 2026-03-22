<?php

namespace App\Actions\AiMatch;

use App\Data\AiMatchRequestData;
use App\Enums\AiMatchStatus;
use App\Models\AiMatchResult;
use App\Models\AiMatchSession;
use App\Models\Product;
use App\Models\User;
use App\Settings\GeneralSettings;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class RunAiMatch
{
    private const WEIGHT_BUDGET = 0.30;

    private const WEIGHT_EVENT_TYPE = 0.25;

    private const WEIGHT_STYLE = 0.20;

    private const WEIGHT_COLOR = 0.15;

    private const WEIGHT_DISTANCE = 0.10;

    public function __construct(
        private CalculateColorScore $colorScorer,
    ) {}

    public function execute(User $customer, AiMatchRequestData $data): AiMatchSession
    {
        $settings = app(GeneralSettings::class);

        return DB::transaction(function () use ($customer, $data, $settings) {
            $session = AiMatchSession::create([
                'customer_id' => $customer->id,
                'session_token' => Str::random(64),
                'event_type_id' => $data->event_type_id,
                'style_preference_id' => $data->style_preference_id,
                'budget_min' => $data->budget_min,
                'budget_max' => $data->budget_max,
                'skin_tone' => $data->skin_tone,
                'latitude' => $data->latitude,
                'longitude' => $data->longitude,
                'status' => AiMatchStatus::Processing,
            ]);

            try {
                $products = $this->fetchCandidates($data, $settings);
                $scored = $this->scoreProducts($products, $data, $settings);
                $results = $this->storeResults($session, $scored, $settings->ai_results_limit);

                $session->update([
                    'status' => AiMatchStatus::Completed,
                    'results_count' => $results->count(),
                ]);
            } catch (\Throwable $e) {
                $session->update(['status' => AiMatchStatus::Failed]);

                throw $e;
            }

            return $session;
        });
    }

    /**
     * @return Collection<int, Product>
     */
    private function fetchCandidates(AiMatchRequestData $data, GeneralSettings $settings): Collection
    {
        $query = Product::query()
            ->active()
            ->fromApprovedVendors()
            ->with(['vendor', 'eventTypes', 'stylePreferences']);

        // Pre-filter by budget with 30% margin
        if ($data->budget_min !== null && $data->budget_max !== null) {
            $marginMin = (int) ($data->budget_min * 0.7);
            $marginMax = (int) ($data->budget_max * 1.3);
            $query->whereBetween('price', [$marginMin, $marginMax]);
        }

        return $query->get();
    }

    /**
     * @param  Collection<int, Product>  $products
     * @return Collection<int, array{product: Product, score: float, color_score: float, distance_km: float|null}>
     */
    private function scoreProducts(Collection $products, AiMatchRequestData $data, GeneralSettings $settings): Collection
    {
        return $products->map(function (Product $product) use ($data, $settings) {
            $budgetScore = $this->calcBudgetScore($product, $data);
            $eventScore = $this->calcEventTypeScore($product, $data);
            $styleScore = $this->calcStyleScore($product, $data);
            $colorScore = $this->calcColorScore($product, $data);
            $distanceKm = $this->calcDistanceKm($product, $data);
            $distanceScore = $this->calcDistanceScore($distanceKm, $settings);

            $totalScore = ($budgetScore * self::WEIGHT_BUDGET)
                + ($eventScore * self::WEIGHT_EVENT_TYPE)
                + ($styleScore * self::WEIGHT_STYLE)
                + ($colorScore * self::WEIGHT_COLOR)
                + ($distanceScore * self::WEIGHT_DISTANCE);

            return [
                'product' => $product,
                'score' => round($totalScore, 4),
                'color_score' => round($colorScore, 4),
                'distance_km' => $distanceKm,
            ];
        })->sortByDesc('score')->values();
    }

    private function calcBudgetScore(Product $product, AiMatchRequestData $data): float
    {
        if ($data->budget_min === null || $data->budget_max === null) {
            return 0.5;
        }

        $price = $product->price;

        if ($price >= $data->budget_min && $price <= $data->budget_max) {
            return 1.0;
        }

        // Partial score for products within 20% outside range
        $range = $data->budget_max - $data->budget_min;
        $margin = max($range * 0.2, 500); // at least $5 margin

        if ($price < $data->budget_min) {
            $diff = $data->budget_min - $price;

            return $diff <= $margin ? 1.0 - ($diff / $margin) * 0.5 : 0.0;
        }

        $diff = $price - $data->budget_max;

        return $diff <= $margin ? 1.0 - ($diff / $margin) * 0.5 : 0.0;
    }

    private function calcEventTypeScore(Product $product, AiMatchRequestData $data): float
    {
        if ($data->event_type_id === null) {
            return 0.5;
        }

        return $product->eventTypes->contains('id', $data->event_type_id) ? 1.0 : 0.0;
    }

    private function calcStyleScore(Product $product, AiMatchRequestData $data): float
    {
        if ($data->style_preference_id === null) {
            return 0.5;
        }

        return $product->stylePreferences->contains('id', $data->style_preference_id) ? 1.0 : 0.0;
    }

    private function calcColorScore(Product $product, AiMatchRequestData $data): float
    {
        if ($data->skin_tone === null || $product->primary_color_hex === null) {
            return 0.5;
        }

        return $this->colorScorer->execute($product->primary_color_hex, $data->skin_tone);
    }

    private function calcDistanceKm(Product $product, AiMatchRequestData $data): ?float
    {
        if ($data->latitude === null || $data->longitude === null) {
            return null;
        }

        $vendor = $product->vendor;

        if ($vendor === null || $vendor->location === null) {
            return null;
        }

        // Haversine formula
        $lat1 = deg2rad($data->latitude);
        $lon1 = deg2rad($data->longitude);
        $lat2 = deg2rad($vendor->location->latitude);
        $lon2 = deg2rad($vendor->location->longitude);

        $dlat = $lat2 - $lat1;
        $dlon = $lon2 - $lon1;

        $a = sin($dlat / 2) ** 2 + cos($lat1) * cos($lat2) * sin($dlon / 2) ** 2;

        return 6371 * 2 * asin(sqrt($a));
    }

    private function calcDistanceScore(?float $distanceKm, GeneralSettings $settings): float
    {
        if ($distanceKm === null) {
            return 0.5;
        }

        $maxRadius = $settings->max_radius_km;

        if ($distanceKm <= 0) {
            return 1.0;
        }

        if ($distanceKm >= $maxRadius) {
            return 0.0;
        }

        return 1.0 - ($distanceKm / $maxRadius);
    }

    /**
     * @param  Collection<int, array{product: Product, score: float, color_score: float, distance_km: float|null}>  $scored
     * @return Collection<int, AiMatchResult>
     */
    private function storeResults(AiMatchSession $session, Collection $scored, int $limit): Collection
    {
        return $scored->take($limit)->values()->map(function (array $item, int $index) use ($session) {
            return AiMatchResult::create([
                'match_session_id' => $session->id,
                'product_id' => $item['product']->id,
                'match_score' => $item['score'],
                'color_match_score' => $item['color_score'],
                'distance_km' => $item['distance_km'],
                'rank_position' => $index + 1,
            ]);
        });
    }
}
