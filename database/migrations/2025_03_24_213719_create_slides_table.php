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
        Schema::create('slides', function (Blueprint $table) {
            $table->id();
            $table->string('photo')->nullable(true);
            $table->string('title')->nullable(true);
            $table->integer("title_size")->nullable(true);
            $table->string("second_title")->nullable(true);
            $table->integer("second_title_size")->nullable(true);
            $table->text("description")->nullable(true);
            $table->boolean("action")->default(false);
            $table->string("button")->nullable(true);
            $table->string("link")->nullable(true);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('slides');
    }
};
