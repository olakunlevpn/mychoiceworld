<?php

namespace App\Models;

use App\Enums\CancelledBy;
use App\Enums\ReservationSource;
use App\Enums\ReservationStatus;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\SoftDeletes;

class Reservation extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'reservation_code',
        'customer_id',
        'vendor_id',
        'product_id',
        'variant_id',
        'status',
        'customer_note',
        'vendor_note',
        'reserved_at',
        'expires_at',
        'confirmed_at',
        'completed_at',
        'cancelled_at',
        'cancelled_by',
        'cancellation_reason',
        'source',
    ];

    protected function casts(): array
    {
        return [
            'status' => ReservationStatus::class,
            'cancelled_by' => CancelledBy::class,
            'source' => ReservationSource::class,
            'reserved_at' => 'datetime',
            'expires_at' => 'datetime',
            'confirmed_at' => 'datetime',
            'completed_at' => 'datetime',
            'cancelled_at' => 'datetime',
        ];
    }

    public function customer(): BelongsTo
    {
        return $this->belongsTo(User::class, 'customer_id');
    }

    public function vendor(): BelongsTo
    {
        return $this->belongsTo(Vendor::class);
    }

    public function product(): BelongsTo
    {
        return $this->belongsTo(Product::class);
    }

    public function variant(): BelongsTo
    {
        return $this->belongsTo(ProductVariant::class, 'variant_id');
    }

    public function review(): HasOne
    {
        return $this->hasOne(Review::class);
    }

    public function scopeActive(Builder $query): Builder
    {
        return $query->whereIn('status', [ReservationStatus::Pending, ReservationStatus::Confirmed]);
    }

    public function scopeExpirable(Builder $query): Builder
    {
        return $query->where('status', ReservationStatus::Pending)
            ->where('expires_at', '<', now());
    }

    public function isActive(): bool
    {
        return in_array($this->status, [ReservationStatus::Pending, ReservationStatus::Confirmed]);
    }
}
