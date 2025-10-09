<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Alumno;
use App\Models\NotaCita;
use App\Models\Cita;
use App\Models\Psicologo;
use App\Models\PsicologoExterno;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\NotaCita>
 */
class NotaCitaFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $cita = Cita::factory()->create();

        return [
            'tipoIntervencion' => $this->faker->randomElement([1,2,3]),
            //'notas' => $this->faker->paragraph(),
            'departamento' => null,
            //'detalleCanalizacion' => null,
            'idCita' => $cita->idCita,
            'foraneo' => $this->faker->randomElement([0,1])
        ];
    }
}
