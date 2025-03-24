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
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->string('name')->nullable(false);
            $table->text('description')->nullable(false);
            $table->unsignedInteger('location')->default(0);
            $table->unsignedInteger('delevery')->default(0);
            $table->string('title')->nullable(false);
            $table->boolean("active_menue")->default(true);
            $table->boolean("active_first_slide")->default(true);
            $table->boolean("active_second_slide")->default(true);
            $table->string("photo", 400)->nullable(false);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('products');
    }
};
