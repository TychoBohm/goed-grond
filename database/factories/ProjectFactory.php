<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Project>
 */
class ProjectFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'projecttitel' => $this->faker->word,
            'opdrachtgever' => $this->faker->word,
            'lengtegraad' => $this->faker->numberBetween(-90, 90),
            'breedtegraad' => $this->faker->numberBetween(-180, 180),
            'samenstelling' => $this->faker->sentence,
            'toepassing' => $this->faker->sentence,
            'analyse' => $this->faker->sentence,
        ];
    }
}
