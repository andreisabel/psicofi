<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    public function up(): void
    {
        DB::unprepared("
            DROP PROCEDURE IF EXISTS get_info_alumno;
            CREATE PROCEDURE get_info_alumno(IN id BIGINT)
            BEGIN
                SELECT
                    claveUnica,
                    nombres,
                    apellidoPaterno,
                    apellidoMaterno,
                    area,
                    carrera,
                    semestre,
                    asesor,
                    condicionAcademica,
                    promedioGral,
                    creditosAprobados,
                    creditosInscritos,
                    sexo,
                    edad
                FROM
                    Alumno
                WHERE claveUnica = id
                LIMIT 1;
            END
        ");
    }

    public function down(): void
    {
        DB::unprepared('DROP PROCEDURE IF EXISTS get_info_alumno');
    }
};
