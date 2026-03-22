<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class VendorAnalytic extends Model
{
    use HasFactory;

    protected $table = 'vendor_analytics';

    protected $fillable = [
        'vendor_id',
        'date',
        'profile_views',
        'product_views',
        'reservations_made',
        'reservations_completed',
        'reservations_no_show',
        'ai_matches_shown',
    ];

    protected function casts(): array
    {
        return [
            'date' => 'date',
        ];
    }

    public function vendor(): BelongsTo
    {
        return $this->belongsTo(Vendor::class);
    }
}
