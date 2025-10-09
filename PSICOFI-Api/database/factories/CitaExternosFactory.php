<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Cita;
use App\Models\PsicologoExterno;
use App\Models\Alumno;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Cita>
 */
class CitaExternosFactory extends Factory
{
    protected $model = Cita::class;
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $horasDisponibles = ["08:00:00", "09:00:00", "10:00:00", "11:00:00", "12:00:00",
                            "13:00:00", "14:00:00", "15:00:00", "16:00:00", "17:00:00"];
        $horaElegida = $this->faker->randomElement($horasDisponibles);
        $indice = array_search($horaElegida, $horasDisponibles);
        unset($horasDisponibles[$indice]);

        $alumnosDisponibles = Alumno::pluck('claveUnica')->toArray();
        $claveElegida = $this->faker->randomElement($alumnosDisponibles);
        $indice = array_search($claveElegida, $alumnosDisponibles);
        unset($alumnosDisponibles[$indice]);

        PsicologoExterno::inRandomOrder()->first()->CURP;

        return [
            'fecha' => $this->faker->randomElement(['2024-05-16', '2024-05-17', '2024-05-18', '2024-05-19', '2024-05-20']),
            'hora' => $horaElegida,
            'claveUnica' => $claveElegida,
            'estadoCita' => $this->faker->randomElement([2,4]),
            'clavePsicologo' => PsicologoExterno::inRandomOrder()->first()->CURP, 
            'clavePsicologoExterno' => null, 
        ];
    }
}
