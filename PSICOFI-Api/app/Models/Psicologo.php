<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Psicologo extends Model
{
    protected $table = 'psicologo';
    public $timestamps = true;
    protected $primaryKey = 'claveUnica';
    use HasFactory;
}
