<?php

use App\Http\Controllers\CursoController;
use App\Http\Controllers\DepartamentoController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\TipoIntervencionController;
use App\Http\Controllers\NotaCitaController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\DateController;
use App\Http\Controllers\PsicoController;
use App\Http\Controllers\AlumnoController;
use App\Http\Controllers\ReporteController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::post('login',[AuthController::class,'login'])->name('login');

Route::post('loginAdmin',[AuthController::class,'loginAdmin'])->name('loginAdmin');

Route::post('alumno/getAlumno',[AlumnoController::class,'getAlumno'])->name('getAlumno');

Route::post('alumno/getDataAlumno',[AlumnoController::class,'getDataAlumno'])->name('getAlumno');

Route::post('alumno/getDate',[AlumnoController::class,'getDate'])->name('getDate');

Route::post('alumno/getRecord',[AlumnoController::class,'getRecord'])->name('getRecord');

Route::post('psicologo/searchPsicologo',[PsicoController::class,'searchPsicologo'])->name('psicologo.searchPsicologo');

Route::post('psicologo/registerPsicologo',[PsicoController::class,'registerPsicologo'])->name('psicologo.registerPsicologo');

Route::post('psicologo/getPsicologos',[PsicoController::class,'getPsicologos'])->name('psicologo.getPsicologos');

Route::post('psicologo/getPatients',[PsicoController::class,'getPatients'])->name('psicologo.getPatients');

Route::put('psicologo/updatePsicologo',[PsicoController::class,'updatePsicologo'])->name('psicologo.updatePsicologo');

Route::put('psicologo/updatePassword',[PsicoController::class,'updatePassword'])->name('psicologo.updatePassword');

Route::post('cita/generateDates',[DateController::class,'generateDates'])->name('cita.generateDates');

Route::put('cita/scheduleDate',[DateController::class,'scheduleDate'])->name('cita.scheduleDate');

Route::get('cita/getDates',[DateController::class,'getDates'])->name('cita.getDates');

Route::get('cita/getAllDates',[DateController::class,'getAllDates'])->name('cita.getAllDates');

Route::post('cita/createDates',[DateController::class,'createDates'])->name('cita.createDates');

Route::post('cita/cancelDate',[DateController::class,'cancelDate'])->name('cita.cancelDate');

Route::delete('cita/deleteDate/{idCita}',[DateController::class,'deleteDate'])->name('cita.deleteDate');

Route::post('cita/confirmDate',[DateController::class,'confirmDate'])->name('cita.confirmDate');

Route::post('/api/nota-cita', [NotaCitaController::class, 'store']);

Route::get('/tipos-intervencion', [TipoIntervencionController::class, 'index']);

Route::post('alumno',[AuthController::class,'getAlumno'])->name('function.obtainAlumno');

Route::post('/crear-cita', [NotaCitaController::class, 'crearCita'])->name('crearCita');

Route::get('/departamentos', [DepartamentoController::class, 'index']);

Route::get('/alumno/{claveUnica}', [AlumnoController::class, 'obtenerAlumno']);

Route::get('/reporte-citas/{idCita}', [NotaCitaController::class, 'getReporteCita'])->name('getReporteCita');

Route::get('/getCita/{idCita}', [NotaCitaController::class, 'getCita'])->name('getCita');

Route::get('/getNotaCita/{idCita}', [NotaCitaController::class, 'getNotaCita'])->name('getNotaCita');

Route::put('/api/nota-cita/{id}', [NotaCitaController::class, 'updateCita'])->name('updateCita');

Route::put('/actualizar-estado-cita/{id}', [DateController::class, 'actualizarEstadoCita'])->name('actualizaEstadoCita');

Route::get('/api/estatus-cita/{idCita}', [DateController::class, 'obtenerEstatusCita'])->name('obtenerEstatusCita');

Route::post('/reporte/getReporte', [ReporteController::class, 'getReporte'])->name('getReporte');

Route::post('/reporte/getAreasCarreras', [ReporteController::class, 'getAreasCarreras'])->name('getAreasCarreras');

Route::get('/reporte/prueba', [NotaCitaController::class, 'prueba'])->name('prueba');

Route::post('/alumno/service', [AuthController::class, 'AlumnoService'])->name('AlumnoService');

Route::get('/csrf-token', function() {
    return response()->json(['csrf_token' => csrf_token()]);
});


