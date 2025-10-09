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
            DROP PROCEDURE IF EXISTS get_cita_actual;
            CREATE PROCEDURE get_cita_actual(IN id BIGINT)
            BEGIN
                SELECT
                    *
                FROM
                    view_citas
                WHERE claveUnica = id
                AND (estado = 'Asistencia confirmada' OR estado = 'Asistencia sin confirmar')
                LIMIT 1;
            END
        ");
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        DB::unprepared('DROP PROCEDURE IF EXISTS get_cita_actual');
    }
};
