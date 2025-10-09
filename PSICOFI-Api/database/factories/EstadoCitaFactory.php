<?php

namespace Database\Factories;

use App\Models\EstadoCita;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\EstadoCita>
 */
class EstadoCitaFactory extends Factory
{
    protected $model = EstadoCita::class;
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'estado' => $this->faker->text(maxNbChars:30), 
        ];
    }
}
