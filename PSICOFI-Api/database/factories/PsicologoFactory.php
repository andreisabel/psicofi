<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Psicologo;

class PsicologoFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'claveUnica' => $this->faker->randomNumber(6,true),
            'nombres' => "Dora Emma", 
            'apellidoPaterno' => "Reynaga", 
            'apellidoMaterno' => "Navarro",
            'idCarrera' => 2,
            'semestre' => null,
            'correo' => "emma.reynaga@uaslp.mx",
            'activo' => 1
        ];
    }
}
