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
            DROP VIEW IF EXISTS view_citas;
            CREATE VIEW view_citas AS
            SELECT 
                cita.idCita,
                cita.hora,
                cita.fecha,
                estadocita.estado AS estado,
                cita.claveUnica,
                IF(cita.clavePsicologoExterno IS NOT NULL, psicologoexterno.nombres, psicologo.nombres) AS 'Nombres psicologo',
                IF(cita.clavePsicologoExterno IS NOT NULL, psicologoexterno.apellidoPaterno, psicologo.apellidoPaterno) AS 'Apellido Pat psicologo',
                IF(cita.clavePsicologoExterno IS NOT NULL, psicologoexterno.apellidoMaterno, psicologo.apellidoMaterno) AS 'Apellido Mat psicologo',
                IF(cita.clavePsicologoExterno IS NOT NULL, psicologoexterno.CURP, psicologo.claveUnica) AS 'idPsicologo',
                IF(cita.clavePsicologoExterno IS NOT NULL, psicologoexterno.correo, psicologo.correo) AS 'correo'
            FROM 
                cita
            LEFT JOIN 
                psicologoexterno ON cita.clavePsicologoExterno = psicologoexterno.CURP
            LEFT JOIN 
                psicologo ON cita.clavePsicologo = psicologo.claveUnica
            JOIN 
                estadocita ON cita.estadoCita = estadocita.idEstadoCita;
        ");
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        DB::unprepared('DROP VIEW IF EXISTS view_citas');
    }
};
