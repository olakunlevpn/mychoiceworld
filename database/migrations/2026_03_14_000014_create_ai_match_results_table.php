<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('ai_match_results', function (Blueprint $table) {
            $table->id();
            $table->foreignId('match_session_id')->constrained('ai_match_sessions')->cascadeOnDelete();
            $table->foreignId('product_id')->constrained('products')->cascadeOnDelete();
            $table->decimal('match_score', 5, 2);
            $table->decimal('color_match_score', 5, 2)->nullable();
            $table->decimal('distance_km', 6, 2)->nullable();
            $table->integer('rank_position');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('ai_match_results');
    }
};
