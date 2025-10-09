<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        DB::unprepared("
            DROP VIEW IF EXISTS view_reportes;
            CREATE VIEW view_reportes AS
            SELECT 
                cita.idCita,
                cita.hora AS horarioAtencion,
                cita.fecha,
                estadocita.estado AS estado,
                tipointervencion.tipoIntervencion AS motivoConsulta,
                cita.claveUnica,
                alumno.carrera,
                alumno.area AS areaConsulta,
                alumno.semestre,
                IF(cita.clavePsicologoExterno IS NOT NULL, psicologoexterno.Carrera, carreraspsico.carrera) AS 'Area'
            FROM 
                cita  
            LEFT JOIN 
                psicologoexterno ON cita.clavePsicologoExterno = psicologoexterno.CURP
            LEFT JOIN 
                psicologo ON cita.clavePsicologo = psicologo.claveUnica
            LEFT JOIN 
                carreraspsico ON psicologo.idCarrera = carreraspsico.idCarrera
            JOIN 
                estadocita ON cita.estadoCita = estadocita.idEstadoCita
            JOIN 
                alumno ON cita.claveUnica = alumno.claveUnica
            JOIN 
                notacita ON cita.idCita = notacita.idCita
            JOIN
                tipointervencion ON notacita.tipoIntervencion = tipointervencion.idTipoIntervencion
            WHERE 
                cita.estadoCita = 4;
        ");
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        DB::unprepared('DROP VIEW IF EXISTS view_reportes');
    }
};
