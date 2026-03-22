<?php

namespace App\Models;

use App\Enums\AiMatchStatus;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class AiMatchSession extends Model
{
    use HasFactory;

    protected $fillable = [
        'customer_id',
        'session_token',
        'event_type_id',
        'style_preference_id',
        'budget_min',
        'budget_max',
        'selfie_uploaded',
        'selfie_url',
        'skin_tone',
        'face_shape',
        'recommended_colors',
        'results_count',
        'latitude',
        'longitude',
        'status',
    ];

    protected function casts(): array
    {
        return [
            'status' => AiMatchStatus::class,
            'recommended_colors' => 'array',
            'selfie_uploaded' => 'boolean',
            'budget_min' => 'integer',
            'budget_max' => 'integer',
            'latitude' => 'decimal:8',
            'longitude' => 'decimal:8',
        ];
    }

    public function customer(): BelongsTo
    {
        return $this->belongsTo(User::class, 'customer_id');
    }

    public function eventType(): BelongsTo
    {
        return $this->belongsTo(EventType::class);
    }

    public function stylePreference(): BelongsTo
    {
        return $this->belongsTo(StylePreference::class);
    }

    public function results(): HasMany
    {
        return $this->hasMany(AiMatchResult::class, 'match_session_id');
    }
}
