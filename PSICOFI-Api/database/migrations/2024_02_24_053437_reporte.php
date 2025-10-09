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
        Schema::create('Reporte',function(Blueprint $table){
            $table->bigInteger('idReporte')->primary();
            $table->string('tituloReporte',80);
            $table->string('descripcion',80);
            $table->date('fechaGeneracion');
            $table->string('area',80);
            $table->string('carrera',80);
            $table->unsignedBigInteger('idUsuario');
            $table->bigInteger('claveUnica');

            // Foreign keys
            $table->foreign('idUsuario')->references('idUsuario')->on('Administrador');
            $table->foreign('claveUnica')->references('claveUnica')->on('Psicologo');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('Reporte', function (Blueprint $table) {
            $table->dropForeign(['claveUnica']);
            $table->dropForeign(['idUsuario']);
        });
        Schema::dropIfExists('Reporte');
    }
};
