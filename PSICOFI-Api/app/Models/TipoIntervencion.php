<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TipoIntervencion extends Model
{
    use HasFactory;

    public $timestamps = false;

    protected $table = 'TipoIntervencion'; 
    protected $primaryKey = 'idTipoIntervencion'; 

    protected $fillable = ['tipoIntervencion'];
}
