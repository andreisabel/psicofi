<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Cita;
use App\Models\Psicologo;
use App\Models\PsicologoExterno;
use App\Models\Alumno;
use App\Models\NotaCita;
use Psy\Readline\Hoa\Console;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Cita>
 */
class CitaFactory extends Factory
{
    protected $model = Cita::class;
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $psicologo = $psicologoExterno = null;
        
        $horas = ["08:00:00", "09:00:00", "10:00:00", "11:00:00", "12:00:00",
                "13:00:00", "14:00:00", "15:00:00", "16:00:00", "17:00:00"];

        $dt = $this->faker->dateTimeBetween($startDate = '-10 months', $endDate = 'now');
        $date = $dt->format("Y-m-d"); 

        $hora = $this->faker->randomElement($horas);

        $alumno = Alumno::select('claveUnica')->inRandomOrder()->first();
        
        $rand = $this->faker->randomElement([1,2]);

        if($rand == 1){
            $psicologo = Psicologo::select('claveUnica')->inRandomOrder()->first()->claveUnica;
        }else if($rand == 2){
            $psicologoExterno = PsicologoExterno::select('curp')->inRandomOrder()->first()->curp;
        }

        return [
            'fecha' => $date,
            'hora' => $hora,
            'claveUnica' => $alumno->claveUnica,
            'estadoCita' => 4,
            'clavePsicologo' => $psicologo,
            'clavePsicologoExterno' => $psicologoExterno,
        ];
    }
}
