<?php

use App\Http\Controllers\AlumnoController;
use App\Http\Controllers\DepartamentoController;
use App\Http\Controllers\NotaCitaController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\TipoIntervencionController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

/*Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});*/

Route::post('alumno',[AuthController::class,'getAlumno'])->name('function.obtainAlumno');
Route::post('/crear-cita', [NotaCitaController::class, 'crearCita'])->name('crearCita');
Route::get('/tipos-intervencion', [TipoIntervencionController::class, 'index']);
Route::get('/departamentos', [DepartamentoController::class, 'index']);
Route::get('/alumno/{claveUnica}', [AlumnoController::class, 'obtenerAlumno']);
// Route::get('alumno/{claveUnica}', 'AlumnoController@obtenerAlumno');


