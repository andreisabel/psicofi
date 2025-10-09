<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('NotaCita',function(Blueprint $table){
            $table->id('idNotaCita');
            $table->unsignedBigInteger('tipoIntervencion');
            // $table->text('notas');
            $table->unsignedBigInteger('departamento')->nullable();
            // $table->text('detalleCanalizacion')->nullable();
            $table->unsignedBigInteger('idCita');
            $table->boolean('foraneo')->nullable();

            // Foreign keys
            $table->foreign('tipoIntervencion')->references('idTipoIntervencion')->on('TipoIntervencion');
            $table->foreign('idCita')->references('idCita')->on('Cita');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('NotaCita', function (Blueprint $table) {
            $table->dropForeign(['tipoIntervencion']);
            $table->dropForeign(['idCita']);
        });
        Schema::dropIfExists('NotaCita');
    }
};
