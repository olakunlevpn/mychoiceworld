<?php

namespace App\Models;

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

    protected $appends = ['public_url', 'public_thumbnail_url'];

    protected function casts(): array
    {
        return [
            'is_primary' => 'boolean',
            'sort_order' => 'integer',
        ];
    }

    public function getPublicUrlAttribute(): ?string
    {
        $value = $this->attributes['url'] ?? null;

        if (! $value) {
            return null;
        }

        if (str_starts_with($value, '/') || str_starts_with($value, 'http')) {
            return $value;
        }

        return Storage::disk('public')->url($value);
    }

    public function getPublicThumbnailUrlAttribute(): ?string
    {
        $value = $this->attributes['thumbnail_url'] ?? null;

        if (! $value) {
            return null;
        }

        if (str_starts_with($value, '/') || str_starts_with($value, 'http')) {
            return $value;
        }

        return Storage::disk('public')->url($value);
    }

    public function getRawUrl(): ?string
    {
        return $this->attributes['url'] ?? null;
    }

    protected static function booted(): void
    {
        static::created(function (ProductImage $image): void {
            $rawUrl = $image->getRawUrl();

            if ($rawUrl && ! str_contains($rawUrl, 'placeholder')) {
                ProductImage::where('product_id', $image->product_id)
                    ->where('id', '!=', $image->id)
                    ->where('url', 'LIKE', '%placeholder%')
                    ->delete();

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
