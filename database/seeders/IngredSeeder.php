<?php

namespace Database\Seeders;

use App\Models\Ingred;
use Illuminate\Database\Seeder;

class IngredSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Ingred::factory()->count(10)->make();
    }
}
