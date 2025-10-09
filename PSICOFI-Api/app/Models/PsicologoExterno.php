<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PsicologoExterno extends Model
{
    protected $guarded = [];
    protected $table = 'psicologoexterno';
    public $timestamps = true;
    protected $primaryKey = 'CURP';
    use HasFactory;
}
