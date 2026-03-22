<?php

namespace App\Actions\AiMatch;

use App\Models\ColorPalette;
use Illuminate\Support\Collection;

class CalculateColorScore
{
    /** @var Collection<int, ColorPalette>|null */
    private ?Collection $paletteCache = null;

    private ?string $cachedSkinTone = null;

    /**
     * Calculate how well a product color matches a skin tone.
     *
     * @return float Score between 0.0 and 1.0
     */
    public function execute(string $productColorHex, string $skinTone): float
    {
        $palette = $this->getPalette($skinTone);

        if ($palette->isEmpty()) {
            return 0.0;
        }

        $productRgb = $this->hexToRgb($productColorHex);

        if ($productRgb === null) {
            return 0.0;
        }

        $bestScore = 0.0;

        foreach ($palette as $entry) {
            $paletteRgb = $this->hexToRgb($entry->color_hex);

            if ($paletteRgb === null) {
                continue;
            }

            $distance = $this->rgbDistance($productRgb, $paletteRgb);

            // Max possible distance in RGB space is sqrt(3 * 255^2) ≈ 441.67
            $normalizedDistance = $distance / 441.67;

            // Invert and weight by the palette entry's score
            $colorScore = (1.0 - $normalizedDistance) * (float) $entry->score;

            $bestScore = max($bestScore, $colorScore);
        }

        return round(min(1.0, $bestScore), 4);
    }

    /**
     * @return Collection<int, ColorPalette>
     */
    private function getPalette(string $skinTone): Collection
    {
        if ($this->cachedSkinTone !== $skinTone) {
            $this->paletteCache = ColorPalette::where('skin_tone', $skinTone)->get();
            $this->cachedSkinTone = $skinTone;
        }

        return $this->paletteCache;
    }

    /**
     * @return array{int, int, int}|null
     */
    private function hexToRgb(string $hex): ?array
    {
        $hex = ltrim($hex, '#');

        if (strlen($hex) !== 6) {
            return null;
        }

        return [
            hexdec(substr($hex, 0, 2)),
            hexdec(substr($hex, 2, 2)),
            hexdec(substr($hex, 4, 2)),
        ];
    }

    /**
     * @param  array{int, int, int}  $a
     * @param  array{int, int, int}  $b
     */
    private function rgbDistance(array $a, array $b): float
    {
        return sqrt(
            ($a[0] - $b[0]) ** 2 +
            ($a[1] - $b[1]) ** 2 +
            ($a[2] - $b[2]) ** 2
        );
    }
}
