<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('vendors', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained('users')->cascadeOnDelete();
            $table->string('store_name', 255);
            $table->string('slug', 255)->unique();
            $table->string('license_number', 100)->nullable();
            $table->string('license_document', 500)->nullable();
            $table->text('description')->nullable();
            $table->string('logo', 500)->nullable();
            $table->string('banner', 500)->nullable();
            $table->string('phone', 20)->nullable();
            $table->string('whatsapp', 20)->nullable();
            $table->string('email', 255)->nullable();
            $table->string('address', 500);
            $table->string('city', 100);
            $table->string('state', 100);
            $table->string('country', 100)->default('US');
            $table->string('postal_code', 20)->nullable();
            $table->geometry('location', 'point');
            $table->json('operating_hours')->nullable();
            $table->string('status')->default('pending');
            $table->text('rejection_reason')->nullable();
            $table->boolean('is_featured')->default(false);
            $table->timestamp('approved_at')->nullable();
            $table->decimal('rating_avg', 3, 2)->nullable();
            $table->integer('rating_count')->default(0);
            $table->timestamps();
            $table->softDeletes();

            $table->index(['status', 'city']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('vendors');
    }
};
