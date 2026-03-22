<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ColorPalette extends Model
{
    use HasFactory;

    protected $fillable = [
        'skin_tone',
        'color_name',
        'color_hex',
        'season',
        'score',
    ];

    protected function casts(): array
    {
        return [
            'score' => 'decimal:2',
        ];
    }
}
