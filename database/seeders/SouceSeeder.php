<?php

namespace Database\Seeders;

use App\Models\Souce;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class SouceSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Souce::factory()->count(10)->make();
    }
}
