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
        Schema::create('Psicologo',function(Blueprint $table){
            $table->bigInteger('claveUnica')->primary();
            $table->string('nombres',60);
            $table->string('apellidoPaterno',60);
            $table->string('apellidoMaterno',60)->nullable()->default(null);;
            $table->unsignedBigInteger('idCarrera');
            $table->bigInteger('semestre')->nullable();
            $table->string('correo');
            $table->boolean('activo');
            $table->timestamps();
            // Foreign key
            $table->foreign('idCarrera')->references('idCarrera')->on('CarrerasPsico');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('Psicologo', function (Blueprint $table) {
            $table->dropForeign(['idCarrera']);
        });
        Schema::dropIfExists('Psicologo');
    }
};
