<?php

namespace App\Models;

use App\Enums\VendorStatus;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;
use Laravel\Scout\Searchable;
use MatanYadaev\EloquentSpatial\Objects\Point;

class Vendor extends Model
{
    use HasFactory, Searchable, SoftDeletes;

    protected $fillable = [
        'user_id',
        'store_name',
        'slug',
        'license_number',
        'license_document',
        'description',
        'logo',
        'banner',
        'phone',
        'whatsapp',
        'email',
        'address',
        'city',
        'state',
        'country',
        'postal_code',
        'location',
        'operating_hours',
        'status',
        'rejection_reason',
        'is_featured',
        'approved_at',
        'rating_avg',
        'rating_count',
    ];

    protected function casts(): array
    {
        return [
            'status' => VendorStatus::class,
            'operating_hours' => 'array',
            'is_featured' => 'boolean',
            'approved_at' => 'datetime',
            'rating_avg' => 'decimal:2',
            'location' => Point::class,
        ];
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function products(): HasMany
    {
        return $this->hasMany(Product::class);
    }

    public function reservations(): HasMany
    {
        return $this->hasMany(Reservation::class);
    }

    public function reviews(): HasMany
    {
        return $this->hasMany(Review::class);
    }

    public function analytics(): HasMany
    {
        return $this->hasMany(VendorAnalytic::class);
    }

    /**
     * @return array<string, mixed>
     */
    public function toSearchableArray(): array
    {
        return [
            'id' => (int) $this->id,
            'store_name' => $this->store_name,
            'description' => $this->description,
            'city' => $this->city,
            'state' => $this->state,
            'country' => $this->country,
            'status' => $this->status->value,
            'rating_avg' => (float) $this->rating_avg,
            'created_at' => $this->created_at?->timestamp,
        ];
    }

    public function shouldBeSearchable(): bool
    {
        return $this->status === VendorStatus::Approved;
    }

    public function scopeApproved(Builder $query): Builder
    {
        return $query->where('status', VendorStatus::Approved);
    }

    public function scopeFeatured(Builder $query): Builder
    {
        return $query->where('is_featured', true);
    }

    public function scopeSearch(Builder $query, string $term): Builder
    {
        return $query->where(fn (Builder $q) => $q
            ->where('store_name', 'like', "%{$term}%")
            ->orWhere('city', 'like', "%{$term}%")
            ->orWhere('description', 'like', "%{$term}%"));
    }
}
