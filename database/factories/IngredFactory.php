<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Ingred>
 */
class IngredFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            "name_fr"=>$this->faker->word(),
            "name_en"=>$this->faker->word(),
            "name_ni"=>$this->faker->word(),
        ];
    }
}
