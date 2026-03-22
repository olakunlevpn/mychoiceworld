<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class AiMatchResult extends Model
{
    use HasFactory;

    protected $fillable = [
        'match_session_id',
        'product_id',
        'match_score',
        'color_match_score',
        'distance_km',
        'rank_position',
    ];

    protected function casts(): array
    {
        return [
            'match_score' => 'decimal:2',
            'color_match_score' => 'decimal:2',
            'distance_km' => 'decimal:2',
            'rank_position' => 'integer',
        ];
    }

    public function session(): BelongsTo
    {
        return $this->belongsTo(AiMatchSession::class, 'match_session_id');
    }

    public function product(): BelongsTo
    {
        return $this->belongsTo(Product::class);
    }
}
