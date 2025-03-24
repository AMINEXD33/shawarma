<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\Commands;
use App\Models\Ingred;
use App\Models\Product;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        // User::factory()->create([
        //     'name' => 'Test User',
        //     'email' => 'test@example.com',
        //     'phone' =>'0667123891',
        //     'password'=> bcrypt('aminemeftah2214'),
        //     "address"=> "IMMG 123 OAH 1513"
        // ]);
        // Product::factory()
        // ->hasIngreds(10)
        // ->hasCategories(2)
        // ->create();

        $commands = Commands::factory()
        ->count(10)
        ->has(
            Product::factory()
            ->withCategories(10)
            ->withIngredients(10)
            ->count(1)
        )
        ->hasBoisons(3)
        ->hasAccompagnements(3)
        ->hasSouces(3)
        ->create();



        
        
    }
}
