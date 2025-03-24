<?php

namespace Database\Seeders;

use App\Models\Accompagnement;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class AccompagnementSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Accompagnement::factory()->count(10)->make();
    }
}
