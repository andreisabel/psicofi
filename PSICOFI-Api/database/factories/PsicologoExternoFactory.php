<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use app\Models\PsicologoExterno;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\PsicologoExterno>
 */
class PsicologoExternoFactory extends Factory
{
    protected $model = PsicologoExterno::class;
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'CURP' => $this->faker->regexify('[A-Z]{4}[0-9]{6}[A-Z]{6}[0-9]{2}'),
            'nombres' => $this->faker->name(),
            'apellidoPaterno' => $this->faker->lastName(), 
            'apellidoMaterno' => $this->faker->lastName(),
            'Carrera' => $this->faker->randomElement(['Licenciatura en psicologia','Licenciatura en psicopedagogia']),
            'semestre' => $this->faker->numberBetween(1,9),
            'activo' => $this->faker->boolean(),
            'correo' => $this->faker->email(),
            'contrasena' => 12345
        ];
    }
}
