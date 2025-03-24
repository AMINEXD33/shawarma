<?php

namespace Database\Seeders;

use App\Models\Boison;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class BoisonSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Boison::factory()->count(10)->make();
    }
}
