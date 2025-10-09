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
            DROP PROCEDURE IF EXISTS get_historial_alumno;
            CREATE PROCEDURE get_historial_alumno(IN id BIGINT)
            BEGIN
                SELECT
                    *
                FROM
                    view_citas
                WHERE claveUnica = id
                AND estado = 'Atendida';
            END
        ");
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        DB::unprepared('DROP PROCEDURE IF EXISTS get_historial_alumno');
    }
};
