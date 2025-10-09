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
            DROP VIEW IF EXISTS view_psicologos;
            CREATE VIEW view_psicologos AS
            SELECT
                psicologo.claveUnica AS idPsicologo,
                psicologo.nombres,
                psicologo.apellidoPaterno,
                psicologo.apellidoMaterno,
                carreraspsico.carrera,
                psicologo.semestre,
                psicologo.activo,
                psicologo.correo,
                NULL AS contrasena,
                psicologo.created_at,
                psicologo.updated_at
            FROM
                psicologo
            LEFT JOIN
                carreraspsico
            ON psicologo.idCarrera = carreraspsico.idCarrera
            UNION
            SELECT
                psicologoexterno.CURP AS idPsicologo,
                psicologoexterno.nombres,
                psicologoexterno.apellidoPaterno,
                psicologoexterno.apellidoMaterno,
                psicologoexterno.Carrera,
                psicologoexterno.semestre,
                psicologoexterno.activo,
                psicologoexterno.correo,
                psicologoexterno.contrasena,
                psicologoexterno.created_at,
                psicologoexterno.updated_at
            FROM
                psicologoexterno;"
        );
        // DB::unprepared("
        //     DROP VIEW IF EXISTS view_psicologos;
        //     CREATE VIEW view_psicologos AS
        //     SELECT 
        //         psicologo.claveUnica AS idPsicologo, 
        //         psicologo.nombres, 
        //         psicologo.apellidoPaterno, 
        //         psicologo.apellidoMaterno, 
        //         carreraspsico.carrera, 
        //         psicologo.semestre, 
        //         psicologo.activo, 
        //         psicologo.correo, 
        //         psicologo.contrasena, 
        //         psicologo.created_at,
        //         psicologo.updated_at
        //     FROM 
        //         psicologo
        //     LEFT JOIN 
        //         carreraspsico 
        //     ON psicologo.idCarrera = carreraspsico.idCarrera
        //     UNION 
        //     SELECT 
        //         * 
        //     FROM 
        //         psicologoexterno;
        // ");
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        DB::unprepared('DROP VIEW IF EXISTS view_psicologos');
    }
};
