<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Departamento extends Model
{
    use HasFactory;
    public $timestamps = false;

    protected $table = 'Departamento'; // Nombre de la tabla en la base de datos

    protected $primaryKey = 'idDepartamento'; // Nombre de la clave primaria en la tabla

    protected $fillable = [ // Lista de campos que pueden ser asignados masivamente (mediante el método create, por ejemplo)
        'departamento'
    ];
}
