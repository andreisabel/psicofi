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
        Schema::create('Cita',function(Blueprint $table){
            $table->id('idCita');
            $table->date('fecha');
            $table->time('hora');
            $table->bigInteger('claveUnica')->nullable()->default(null);
            $table->unsignedBigInteger('estadoCita');
            $table->bigInteger('clavePsicologo')->nullable()->default(null);
            $table->string('clavePsicologoExterno',18)->nullable()->default(null);

            // Foreign keys
            $table->foreign('claveUnica')->references('claveUnica')->on('Alumno');
            $table->foreign('estadoCita')->references('idEstadoCita')->on('EstadoCita');
            $table->foreign('clavePsicologo')->references('claveUnica')->on('Psicologo');
            $table->foreign('clavePsicologoExterno')->references('CURP')->on('PsicologoExterno');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('Cita', function (Blueprint $table) {
            $table->dropForeign(['estadoCita']);
            $table->dropForeign(['clavePsicologo']);
            $table->dropForeign(['clavePsicologoExterno']);
        });
        Schema::dropIfExists('Cita');
    }
};
