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
        Schema::create('Administrador',function(Blueprint $table){
            $table->id('idUsuario');
            $table->string('nombres',60);
            $table->string('apellidoPaterno',60);
            $table->string('apellidoMaterno',60);
            $table->string('correo',80);
            $table->string('telefono',30);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('Administrador');
    }
};
