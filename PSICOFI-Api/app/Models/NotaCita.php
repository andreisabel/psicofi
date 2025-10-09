<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class NotaCita extends Model
{
    use HasFactory;

    public $timestamps = false;

    protected $table = 'notacita'; 

    protected $primaryKey = 'idNotaCita'; 
    protected $fillable = [ 
        'tipoIntervencion',
        // 'notas',
        'departamento',
        // 'detalleCanalizacion',
        'idCita',
        'foraneo'
    ];
}
