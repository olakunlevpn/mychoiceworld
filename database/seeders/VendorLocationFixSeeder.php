<?php

namespace Database\Seeders;

use App\Models\Vendor;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Http;
use MatanYadaev\EloquentSpatial\Objects\Point;

class VendorLocationFixSeeder extends Seeder
{
    public function run(): void
    {
        $vendors = Vendor::all();

        foreach ($vendors as $vendor) {
            $query = implode(', ', array_filter([$vendor->address, $vendor->city, $vendor->state, $vendor->country]));

            if (! $query) {
                continue;
            }

            try {
                $response = Http::timeout(10)
                    ->withHeaders(['User-Agent' => 'MyChoiceMyWorld/1.0'])
                    ->get('https://nominatim.openstreetmap.org/search', [
                        'q' => $query,
                        'format' => 'json',
                        'limit' => 1,
                    ]);

                $data = $response->json();

                if (! empty($data[0]['lat']) && ! empty($data[0]['lon'])) {
                    $vendor->update([
                        'location' => new Point(
                            (float) $data[0]['lat'],
                            (float) $data[0]['lon'],
                        ),
                    ]);
                    $this->command->info("Updated: {$vendor->store_name} → {$data[0]['lat']}, {$data[0]['lon']}");
                } else {
                    $this->command->warn("No result for: {$vendor->store_name} ({$query})");
                }

                // Respect Nominatim rate limit (1 req/sec)
                sleep(1);
            } catch (\Exception $e) {
                $this->command->error("Failed: {$vendor->store_name} — {$e->getMessage()}");
            }
        }
    }
}
