<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('ai_match_sessions', function (Blueprint $table) {
            $table->id();
            $table->foreignId('customer_id')->nullable()->constrained('users')->nullOnDelete();
            $table->string('session_token', 100)->unique();
            $table->foreignId('event_type_id')->nullable()->constrained('event_types')->nullOnDelete();
            $table->foreignId('style_preference_id')->nullable()->constrained('style_preferences')->nullOnDelete();
            $table->decimal('budget_min', 10, 2)->nullable();
            $table->decimal('budget_max', 10, 2)->nullable();
            $table->boolean('selfie_uploaded')->default(false);
            $table->string('selfie_url', 500)->nullable();
            $table->string('skin_tone', 50)->nullable();
            $table->string('face_shape', 50)->nullable();
            $table->json('recommended_colors')->nullable();
            $table->integer('results_count')->nullable();
            $table->decimal('latitude', 10, 8)->nullable();
            $table->decimal('longitude', 11, 8)->nullable();
            $table->string('status')->default('processing');
            $table->timestamps();

            $table->index(['customer_id', 'status']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('ai_match_sessions');
    }
};
