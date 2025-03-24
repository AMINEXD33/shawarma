<?php

namespace Database\Factories;

use App\Models\Category;
use App\Models\Ingred;
use App\Models\Product;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Product>
 */
class ProductFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            "name"=>$this->faker->name,
            "description"=> $this->faker->text,
            "location"=>$this->faker->randomNumber(3),
            "delevery"=>$this->faker->randomNumber(3),
            "title"=> $this->faker->word(),
            "active_menue"=>$this->faker->boolean(),
            "active_first_slide"=>$this->faker->boolean(),
            "active_second_slide"=>$this->faker->boolean(),
            "photo"=>$this->faker->url(),
        ];
    }


    public function withIngredients($count = 3)
    {
        return $this->afterCreating(function (Product $product) use ($count) {
            $ingredients = Ingred::factory()->count($count)->create();
            $product->ingreds()->attach($ingredients);
        });
    }

    public function withCategories($count = 2)
    {
        return $this->afterCreating(function (Product $product) use ($count) {
            $categories = Category::factory()->count($count)->create();
            $product->categories()->attach($categories);
        });
    }
}
