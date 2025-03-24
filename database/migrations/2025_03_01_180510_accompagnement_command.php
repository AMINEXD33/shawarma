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
        Schema::create("accompagnement_commands", function (Blueprint $table) {
            $table->id();
            $table->foreignId("commands_id")->constrained("commands")->onDelete("cascade")->nullable(false);
            $table->foreignId("accompagnement_id")->constrained("accompagnements")->onDelete("cascade")->nullable(false);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('accompagnement_command');
    }
};
