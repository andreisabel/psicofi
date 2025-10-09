<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Administrador;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Alumno>
 */
class AdministradorFactory extends Factory
{

    protected $model = Administrador::class;
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'idUsuario' => $this->faker->randomNumber(6,true),
            'nombres' => "Dora Emma", 
            'apellidoPaterno' => "Reynaga", 
            'apellidoMaterno' => "Navarro",
            'correo' => "emma.reynaga@uaslp.mx",
            'telefono' => "123456890"
        ];
    }
}
