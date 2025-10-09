<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use App\Models\Cita;
use App\Models\Departamento;
use Illuminate\Database\Seeder;
use App\Models\Administrador;
use App\Models\Alumno;
use App\Models\CarrerasPsico;
use App\Models\EstadoCita;
use App\Models\Psicologo;
use App\Models\PsicologoExterno;
use App\Models\TipoIntervencion;
use App\Models\NotaCita;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        //Alumno::factory(100)->create();
        PsicologoExterno::factory(2)->create();
        CarrerasPsico::create(['carrera' => 'Licenciatura en psicopedagogia']);
        CarrerasPsico::create(['carrera' => 'Licenciatura en psicologia']);
        EstadoCita::create(['estado' => 'Asistencia confirmada']);
        EstadoCita::create(['estado' => 'Asistencia sin confirmar']);
        EstadoCita::create(['estado' => 'En atención']);
        EstadoCita::create(['estado' => 'Atendida']);
        EstadoCita::create(['estado' => 'No atendida']);
        EstadoCita::create(['estado' => 'Cancelada']);
        EstadoCita::create(['estado' => 'Libre']);
        Psicologo::factory(1)->create();

        $tiposIntervencion = [
            ['tipoIntervencion' => 'Emocional'],
            ['tipoIntervencion' => 'Social'],
            ['tipoIntervencion' => 'Academica'],
        ];

        // Inserta los datos en la tabla TipoIntervencion
        foreach ($tiposIntervencion as $tipoIntervencionData) {
            TipoIntervencion::create($tipoIntervencionData);
        }

        // $alumnos = [
        //     [
        //         'claveUnica' => '324109',
        //         'nombres' => 'Fernando Antonio',
        //         'apellidoPaterno' => 'Ramírez',
        //         'apellidoMaterno' => 'Martínez',
        //         'edad' => 21,
        //         'sexo' => 'M',
        //         'area' => 'Ciencias de la computación',
        //         'carrera' => 'Ing. en Sistemas Inteligentes',
        //         'semestre' => 8,
        //         'condicionAcademica' => 'INSCRITO',
        //         'creditosAprobados' => 345,
        //         'creditosInscritos' => 48,
        //         'promedioGral' => 9.4,
        //         'asesor' => 'Dra. Sandra Edith Nava Muñoz',
        //         'contrasena' => '1234567890',
        //         'habilitado' => true,
        //     ]
        // ];

        // Inserta los datos en la tabla alumno
        // foreach ($alumnos as $alumnoData) {
        //     Alumno::create($alumnoData);
        // }

        Departamento::create([
            'departamento' => "Psiquiatría",
        ]);
        Departamento::create([
            'departamento' => "Neurología",
        ]);
        Departamento::create([
            'departamento' => "TrabajoSocial",
        ]);

        Administrador::factory(1)->create();

        //NotaCita::factory(2000)->create();
    }
}
