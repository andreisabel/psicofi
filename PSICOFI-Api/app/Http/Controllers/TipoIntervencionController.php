<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\TipoIntervencion;

class TipoIntervencionController extends Controller
{
    //
    public function index()
    {
        return TipoIntervencion::all();
    }
}
