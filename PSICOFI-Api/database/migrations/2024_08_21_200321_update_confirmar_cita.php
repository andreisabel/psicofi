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
            DROP FUNCTION IF EXISTS confirmar_cita;
            CREATE FUNCTION confirmar_cita(
                idCita BIGINT
            )
            RETURNS TINYINT
            LANGUAGE SQL
            DETERMINISTIC
            MODIFIES SQL DATA
            SQL SECURITY DEFINER
            COMMENT ''
            BEGIN
            DECLARE resultado TINYINT;
                UPDATE cita
                        SET  estadoCita = 1   
                        WHERE cita.idCita = idCita
                        AND estadoCita != 6
                        AND estadocita = 2;

                        IF ROW_COUNT() > 0 THEN
                            SET resultado = 1;
                        ELSE
                            SET resultado = 0;
                        END IF;

                        RETURN resultado;
            END
        ");
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        DB::unprepared('DROP FUNCTION IF EXISTS confirmar_cita');
    }
};
