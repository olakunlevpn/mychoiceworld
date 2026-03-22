<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('vendor_analytics', function (Blueprint $table) {
            $table->id();
            $table->foreignId('vendor_id')->constrained('vendors')->cascadeOnDelete();
            $table->date('date');
            $table->integer('profile_views')->default(0);
            $table->integer('product_views')->default(0);
            $table->integer('reservations_made')->default(0);
            $table->integer('reservations_completed')->default(0);
            $table->integer('reservations_no_show')->default(0);
            $table->integer('ai_matches_shown')->default(0);
            $table->timestamps();

            $table->unique(['vendor_id', 'date']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('vendor_analytics');
    }
};
