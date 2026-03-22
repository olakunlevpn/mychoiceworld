<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class HeroSlide extends Model
{
    protected $fillable = [
        'heading',
        'description',
        'cta_text',
        'cta_link',
        'background_image',
        'sort_order',
        'is_active',
    ];

    protected function casts(): array
    {
        return [
            'is_active' => 'boolean',
        ];
    }

    protected $appends = ['background_image_url'];

    public function getBackgroundImageUrlAttribute(): ?string
    {
        if (! $this->background_image) {
            return null;
        }

        // Already an absolute URL or public path
        if (str_starts_with($this->background_image, '/') || str_starts_with($this->background_image, 'http')) {
            return $this->background_image;
        }

        // Storage path — prepend /storage/
        return Storage::disk('public')->url($this->background_image);
    }

    public function scopeActive(Builder $query): Builder
    {
        return $query->where('is_active', true)->orderBy('sort_order');
    }
}
