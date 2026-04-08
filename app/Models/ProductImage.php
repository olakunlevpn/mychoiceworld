<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Facades\Storage;

class ProductImage extends Model
{
    use HasFactory;

    protected $fillable = [
        'product_id',
        'url',
        'thumbnail_url',
        'alt_text',
        'color',
        'sort_order',
        'is_primary',
    ];

    protected function casts(): array
    {
        return [
            'is_primary' => 'boolean',
            'sort_order' => 'integer',
        ];
    }

    protected function url(): Attribute
    {
        return Attribute::get(function (?string $value): ?string {
            if (! $value) {
                return null;
            }

            if (str_starts_with($value, '/') || str_starts_with($value, 'http')) {
                return $value;
            }

            return Storage::disk('public')->url($value);
        });
    }

    protected function thumbnailUrl(): Attribute
    {
        return Attribute::get(function (?string $value): ?string {
            if (! $value) {
                return null;
            }

            if (str_starts_with($value, '/') || str_starts_with($value, 'http')) {
                return $value;
            }

            return Storage::disk('public')->url($value);
        });
    }

    public function getRawUrl(): ?string
    {
        return $this->attributes['url'] ?? null;
    }

    protected static function booted(): void
    {
        static::created(function (ProductImage $image): void {
            $rawUrl = $image->getRawUrl();

            // When a real image is added, clean up placeholder images for the same product
            if ($rawUrl && ! str_contains($rawUrl, 'placeholder')) {
                ProductImage::where('product_id', $image->product_id)
                    ->where('id', '!=', $image->id)
                    ->where('url', 'LIKE', '%placeholder%')
                    ->delete();

                // Set as primary if no other primary exists
                $hasPrimary = ProductImage::where('product_id', $image->product_id)
                    ->where('id', '!=', $image->id)
                    ->where('is_primary', true)
                    ->exists();

                if (! $hasPrimary) {
                    $image->update(['is_primary' => true]);
                }
            }
        });
    }

    public function product(): BelongsTo
    {
        return $this->belongsTo(Product::class);
    }
}
