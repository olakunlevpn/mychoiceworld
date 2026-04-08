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

    public function product(): BelongsTo
    {
        return $this->belongsTo(Product::class);
    }
}
