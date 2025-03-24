<?php

namespace Database\Seeders;

use App\Models\Commands;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CommandsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Commands::factory()->count(10)->make();
    }
}
