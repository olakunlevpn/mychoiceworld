<?php

namespace App\Models;

use App\Enums\Gender;
use App\Enums\ProductStatus;
use App\Enums\VendorStatus;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\SoftDeletes;
use Laravel\Scout\Searchable;

class Product extends Model
{
    use HasFactory, Searchable, SoftDeletes;

    protected $fillable = [
        'vendor_id',
        'category_id',
        'name',
        'slug',
        'description',
        'price',
        'compare_price',
        'currency',
        'gender',
        'primary_color',
        'primary_color_hex',
        'status',
        'is_featured',
        'is_reservable',
        'views_count',
        'reservations_count',
    ];

    protected function casts(): array
    {
        return [
            'status' => ProductStatus::class,
            'gender' => Gender::class,
            'price' => 'integer',
            'compare_price' => 'integer',
            'is_featured' => 'boolean',
            'is_reservable' => 'boolean',
        ];
    }

    public function vendor(): BelongsTo
    {
        return $this->belongsTo(Vendor::class);
    }

    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class);
    }

    public function images(): HasMany
    {
        return $this->hasMany(ProductImage::class);
    }

    public function primaryImage(): HasOne
    {
        return $this->hasOne(ProductImage::class)
            ->where('url', 'NOT LIKE', '%placeholder%')
            ->where('is_primary', true);
    }

    public function variants(): HasMany
    {
        return $this->hasMany(ProductVariant::class);
    }

    public function eventTypes(): BelongsToMany
    {
        return $this->belongsToMany(EventType::class, 'product_event_type');
    }

    public function stylePreferences(): BelongsToMany
    {
        return $this->belongsToMany(StylePreference::class, 'product_style_preference');
    }

    public function reservations(): HasMany
    {
        return $this->hasMany(Reservation::class);
    }

    public function wishlists(): HasMany
    {
        return $this->hasMany(Wishlist::class);
    }

    public function aiMatchResults(): HasMany
    {
        return $this->hasMany(AiMatchResult::class);
    }

    /**
     * @return array<string, mixed>
     */
    public function toSearchableArray(): array
    {
        return [
            'id' => (int) $this->id,
            'name' => $this->name,
            'description' => $this->description,
            'price' => (int) $this->price,
            'gender' => $this->gender?->value,
            'primary_color' => $this->primary_color,
            'status' => $this->status->value,
            'is_featured' => $this->is_featured,
            'category_name' => $this->category?->name,
            'vendor_name' => $this->vendor?->store_name,
            'vendor_city' => $this->vendor?->city,
            'vendor_status' => $this->vendor?->status->value,
            'created_at' => $this->created_at?->timestamp,
        ];
    }

    public function shouldBeSearchable(): bool
    {
        return $this->status === ProductStatus::Active
            && $this->vendor
            && $this->vendor->status === VendorStatus::Approved;
    }

    public function scopeActive(Builder $query): Builder
    {
        return $query->where('status', ProductStatus::Active);
    }

    public function scopeReservable(Builder $query): Builder
    {
        return $query->where('is_reservable', true);
    }

    public function scopeFeatured(Builder $query): Builder
    {
        return $query->where('is_featured', true);
    }

    public function scopeFromApprovedVendors(Builder $query): Builder
    {
        return $query->whereHas('vendor', fn (Builder $q) => $q->where('status', VendorStatus::Approved));
    }

    public function scopeSearch(Builder $query, string $term): Builder
    {
        return $query->where(fn (Builder $q) => $q
            ->where('name', 'like', "%{$term}%")
            ->orWhere('description', 'like', "%{$term}%"));
    }
}
