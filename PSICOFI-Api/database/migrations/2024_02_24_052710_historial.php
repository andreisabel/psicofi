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
        // Schema::create('Historial',function(Blueprint $table){
        //     $table->id('idHistorial');
        //     $table->bigInteger('claveUnica');
        //     $table->unsignedBigInteger('idNotaCita');
        //     $table->boolean('alumnoForaneo');

        //     // Foreign keys
        //     $table->foreign('claveUnica')->references('claveUnica')->on('Alumno');
        //     $table->foreign('idNotaCita')->references('idNotaCita')->on('NotaCita');
        // });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        // Schema::table('Historial', function (Blueprint $table) {
        //     $table->dropForeign(['claveUnica']);
        //     $table->dropForeign(['idNotaCita']);
        // });
        Schema::dropIfExists('Historial');
    }
};
