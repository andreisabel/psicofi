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
        Schema::create('Alumno',function(Blueprint $table){
            $table->bigInteger('claveUnica')->primary();
            // $table->string('nombres',60);
            // $table->string('apellidoPaterno',60);
            // $table->string('apellidoMaterno',60);
            // $table->integer('edad');
            // $table->char('sexo',1);
            $table->string('area',50);
            $table->string('carrera',50);
            $table->integer('semestre');
            // $table->string('condicionAcademica',50);
            // $table->integer('creditosAprobados');
            // $table->integer('creditosInscritos');
            // $table->float('promedioGral');
            // $table->string('asesor',100);
            // $table->string('contrasena',20)->nullable()->default(null);
            $table->date('fechaCancelacion')->nullable()->default(null);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('Alumno');
    }
};
