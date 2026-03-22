<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Review extends Model
{
    use HasFactory;

    protected $fillable = [
        'customer_id',
        'vendor_id',
        'product_id',
        'reservation_id',
        'rating',
        'comment',
        'is_published',
        'vendor_reply',
        'vendor_replied_at',
    ];

    protected function casts(): array
    {
        return [
            'is_published' => 'boolean',
            'vendor_replied_at' => 'datetime',
            'rating' => 'integer',
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

    public function reservation(): BelongsTo
    {
        return $this->belongsTo(Reservation::class);
    }
}
