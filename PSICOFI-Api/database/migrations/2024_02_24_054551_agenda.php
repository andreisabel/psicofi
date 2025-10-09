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
        Schema::create('Agenda',function(Blueprint $table){
            $table->id('idAgenda');
            $table->dateTime('fechaHoraDisponible');
            $table->boolean('reservada');
            $table->bigInteger('clavePsicologo');
            $table->bigInteger('claveUnica');
            $table->string('clavePsicologoExterno',18);

            // Foreign keys
            $table->foreign('claveUnica')->references('claveUnica')->on('Alumno');
            $table->foreign('clavePsicologo')->references('claveUnica')->on('Psicologo');
            $table->foreign('clavePsicologoExterno')->references('CURP')->on('PsicologoExterno');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('Agenda', function (Blueprint $table) {
            $table->dropForeign(['claveUnica']);
            $table->dropForeign(['clavePsicologo']);
            $table->dropForeign(['clavePsicologoExterno']);
        });
        Schema::dropIfExists('Agenda');
    }
};
