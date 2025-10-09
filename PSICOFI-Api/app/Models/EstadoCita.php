<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class EstadoCita extends Model
{
    protected $table = 'estadocita';
    public $timestamps = false;
    use HasFactory;
}
