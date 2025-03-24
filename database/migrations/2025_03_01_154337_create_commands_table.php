<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('commands', function (Blueprint $table) {
            $table->id();
            $table->unsignedInteger('num_articles')->default(0);
            $table->unsignedInteger('total')->default(0);
            $table->foreignId('promo_id')->nullable()->constrained('promos')->onDelete('cascade')->nullable(false);
            $table->foreignId('user_id')->nullable()->constrained('users')->onDelete('cascade')->nullable(false);
            $table->unsignedInteger('delevry_fees')->default(0);
            $table->unsignedInteger('final_price')->default(0);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('commands');
    }
};
