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
        Schema::create("commands_product", function (Blueprint $table) {
            $table->id();
            $table->foreignId("commands_id")->constrained("commands")->onDelete("cascade")->nullable(false);
            $table->foreignId("product_id")->constrained("products")->onDelete("cascade")->nullable(false);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('commands_product');
    }
};
