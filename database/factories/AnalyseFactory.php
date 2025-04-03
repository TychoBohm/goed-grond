<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Analyse>
 */
class AnalyseFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'method' => $this->faker->word,
            'resultaat' => $this->faker->sentence,
            'datum' => $this->faker->date(),
            // 'project_id' => \App\Models\Project::factory(),
        ];
    }
}
