<?php

namespace Database\Factories;

use App\Models\Promo;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Commands>
 */
class CommandsFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            "num_articles"=> $this->faker->randomNumber(1),
            "total"=>$this->faker->randomNumber(3),
            "promo_id"=>Promo::factory()->create()->id,
            "user_id"=>User::factory()->create()->id,
            "delevry_fees"=>$this->faker->randomNumber(3),
            "final_price"=>$this->faker->randomNumber(3)
        ];
    }
}
