<?php

namespace App\Models;

use App\Enums\PageStatus;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;

class Page extends Model
{
    protected $fillable = [
        'title',
        'slug',
        'body',
        'excerpt',
        'cover_image',
        'status',
        'show_in_footer',
        'sort_order',
        'meta_title',
        'meta_description',
        'published_at',
    ];

    protected function casts(): array
    {
        return [
            'status' => PageStatus::class,
            'show_in_footer' => 'boolean',
            'published_at' => 'datetime',
        ];
    }

    public function scopePublished(Builder $query): Builder
    {
        return $query->where('status', PageStatus::Published);
    }

    public function scopeFooterPages(Builder $query): Builder
    {
        return $query->published()->where('show_in_footer', true)->orderBy('sort_order');
    }
}
