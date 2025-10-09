<?php

namespace App\Http\Controllers;

use App\Models\Cita;
use Illuminate\Http\Request;
use App\Models\PsicologoExterno;
use App\Models\Psicologo;
use Carbon\Carbon;
use App\Mail\confirmDateMail;
use App\Mail\confirmDateMailPsicologo;
use App\Mail\cancelMail;
use App\Mail\cancelMailPsicologo;
use App\Mail\cancelMailRestriction;
use App\Mail\scheduleDateMail;
use App\Mail\scheduleDateMailPsicologo;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\DB;
use App\Jobs\SendEmail;
use Illuminate\Support\Facades\Log;

class DateController extends Controller
{
    private $AlumnoController;

    public function __construct(\App\Http\Controllers\AlumnoController $AlumnoController)
    {
        $this->AlumnoController = $AlumnoController;
    }

    public function getAllDates(Request $request){
        $id = $request->input('id',null);

        try{
            if(strlen($id) == 18){
                $citas = DB::select('SELECT idCita, idPsicologo AS clavePsicologoExterno,
                                                hora,fecha,estado,claveUnica
                                        FROM view_citas 
                                        WHERE idPsicologo = ?', [$id]);
            }else if(strlen($id) == 6){
                $citas = DB::select('SELECT idCita, idPsicologo AS clavePsicologo,
                                                hora,fecha,estado,claveUnica
                                        FROM view_citas 
                                        WHERE idPsicologo = ?', [$id]);
            } else {
                return response()->json(['error' => 'ID inválido'], 400);
            }
            $citas = collect($citas);
            if($citas->isNotEmpty()){
                return json_encode($citas);
            }
        }catch(\Exception $e){
            return $e;
        }
    }

    public function getDates(Request $request){
        $id = $request->input('id',null);
        //Validación de que $id tenga un valor
        if($id != null){
            $diaActual = Carbon::now($tz='America/Mexico_City');
            $diaProximo = $diaActual->addDays(7);
            $fecha = $diaProximo->toDateString();

            $citas = DB::table('view_citas')
                ->where('idPsicologo',$id)
                ->where('estado','libre')
                ->where('fecha','>=',$fecha)
                ->get();

            return $citas;

            if(!empty($citas)){
                $citasPsicologo = collect($citas);

                if($citasPsicologo->isNotEmpty()){
                    return response()->json($citasPsicologo,200);
                }else{
                    return response()->json(['error' => 'ID inválido'], 400);
                }
            }else{
                // return response([]);
                return response()->json(['error' => 'No se encontraron citas disponibles'], 204);
            }
        }
        else{
            return response()->json(['error' => 'ID no proporcionado, valor nulo encontrado'], 400);
        }
    }

    public function generateDates(){
        $psicologos_externos = PsicologoExterno::pluck('curp');
        $psicologos = Psicologo::pluck('claveUnica');

        $fechas = array();
        $fechaActual = Carbon::now();

        for ($i = 0; count($fechas) < 5; $i++) {
            if ($fechaActual->dayOfWeek != Carbon::SATURDAY && $fechaActual->dayOfWeek != Carbon::SUNDAY) {
                $fechas[] = $fechaActual->toDateString();
            }

            $fechaActual->addDay();
        }

        try{
            foreach ($psicologos_externos as $curp) {
                foreach ($fechas as $fecha) {
                    $horaInicio = Carbon::createFromTime(9, 0, 0);
                    $horaFin = Carbon::createFromTime(14, 0, 0);
    
                    while ($horaInicio < $horaFin) {
                        $cita = new Cita;
    
                        $cita->fecha = $fecha; 
                        $cita->hora = $horaInicio->toTimeString();
                        $cita->estadoCita = 7;
                        $cita->clavePsicologo = null;
                        $cita->clavePsicologoExterno = $curp;
                        
                        $cita->save();
    
                        $horaInicio->addHour();
                    }
                }
            }
    
            foreach ($psicologos as $claveUnica) {
                foreach ($fechas as $fecha) {
                    $horaInicio = Carbon::createFromTime(9, 0, 0);
                    $horaFin = Carbon::createFromTime(14, 0, 0);
    
                    while ($horaInicio < $horaFin) {
                        $cita = new Cita;
    
                        $cita->fecha = $fecha; 
                        $cita->hora = $horaInicio->toTimeString();
                        $cita->estadoCita = 7;
                        $cita->clavePsicologo = $claveUnica;
                        $cita->clavePsicologoExterno = null;
                        
                        $cita->save();
    
                        $horaInicio->addHour();
                    }
                }
            }

            return true;
        }catch(\Exception $e){
            return $e;
        }
    }

    private function checkDate(?String $date):bool
    {
        if($date == null){
            return true;
        }
    
        $diaActual = Carbon::now($tz='America/Mexico_City');
        $fechaActual = $diaActual->toDateString();

        if($fechaActual >= $date){
            return true;
        }

        return false;
    }

    private function sendScheduleMail(String $fecha,String $hora,array $alumno,String $id){
        try{
            if(strlen($id) != 6 && strlen($id) != 18){
                return "ID incorrecto";
            }
    
            $psicologo = DB::table('view_psicologos')
                            ->selectRaw("CONCAT(nombres, ' ', apellidoPaterno, ' ', apellidoMaterno) AS nombreCompleto,correo")
                            ->where('idPsicologo',$id)
                            ->first();
    
            if($psicologo == null){
                return "Psicologo no encontrado";
            }
    
            $correoAlumno = 'A' . $alumno['clave_unica'] . '@alumnos.uaslp.mx';
            
            $details = [
                'fecha' => $fecha,
                'hora' => $hora,
                'psicologo' => $psicologo->nombreCompleto,
                'name' => $alumno['nombre_alumno']
            ];
    
            SendEmail::dispatch($correoAlumno,new scheduleDateMail($details));
            SendEmail::dispatch($psicologo->correo,new scheduleDateMailPsicologo($details));

        }catch(\Exception $e){
            Log::info($e);
        }
    }

    public function scheduleDate(Request $request){
        $id = $request->input('id');
        $claveUnica = $request->input('claveUnica');
        $fecha = $request->input('fecha');
        $hora = $request->input('hora');

        if($claveUnica == null || $id == null || $hora == null || $fecha == null){
            $respuesta = ['Error' => 'Consulta invalida'];
            return response($respuesta,200);
        }

        $datosAlumno = $this->AlumnoController->obtenerAlumno($claveUnica);
        $alumno = $datosAlumno->getData(); 

        if (empty((array) $alumno)) {
            $alumno = $this->AlumnoController->addAlumno($claveUnica);
        }

        if($alumno == null){
            $respuesta = ['Error' => 'Alumno invalido'];
            return response($respuesta,200);
        }else{
            $datosAlumno = $this->AlumnoController->obtainAlumno($claveUnica);
            $alumnoWS = json_decode($datosAlumno, true);
        }

        $validDate = $this->checkDate($alumno->fechaCancelacion);

        if($validDate == null){
            $respuesta = ['Error' => 'Alumno con penalización por cancelación'];
            return response($respuesta,200);
        }

        try {
            if(strlen($id) == 6){
                $cita = Cita::where('clavePsicologo', $id)
                ->where('fecha', $fecha)
                ->where('hora', $hora)
                ->where('estadoCita', 7)
                ->update([
                    'claveUnica' => $claveUnica,
                    'estadoCita' => 2
                ]);

                if($cita > 0) {
                    $this->sendScheduleMail($fecha,$hora,$alumnoWS,$id);

                    $respuesta = ['Cita agendada correctamente'];
                    return response($respuesta,200);
                } else {
                    $respuesta = ['Cita NO agendada'];
                    return response($respuesta,200);
                }
            }else if(strlen($id) == 18){
                $cita = Cita::where('clavePsicologoExterno', $id)
                ->where('fecha', $fecha)
                ->where('hora', $hora)
                ->where('estadoCita', 7)
                ->update([
                    'claveUnica' => $claveUnica,
                    'estadoCita' => 2
                ]);
    
                if($cita > 0) {
                    $this->sendScheduleMail($fecha,$hora,$alumnoWS,$id);

                    $respuesta = ['Cita agendada correctamente'];
                    return json_encode($respuesta);
                } else {
                    $respuesta = ['Cita NO agendada'];
                    return json_encode($respuesta); 
                }
            }else {
                $respuesta = ['Error' => 'ID incorrecto'];
                return json_encode($respuesta);
            }
        }catch (\Exception $e){
            $respuesta = ['Error' => 'Ocurrio un error'];
            return json_encode($e); 
        }
    }

    public function createDates(Request $request){
        $id = $request->input('id',null);
        $fecha = $request->input('fecha',null);
        $horas = $request->input('horas');

        $diaActual = Carbon::now($tz='America/Mexico_City');
        $fechaActual = $diaActual->toDateString();
        $horaActual = $diaActual->toTimeString();

        try{
            if(strlen($id) == 18){
                if($fecha != null && $horas != null){
                    try{
                        foreach($horas as $hora){
                            // Comprobación para verificar que la cita no existe
                            $citaExistente = Cita::where('fecha', date('Y-m-d', strtotime($fecha)))
                            ->where('hora', $hora)
                            ->where('clavePsicologoExterno', $id)
                            ->exists();
                            
                            if(!$citaExistente){
                                if($fecha == $fechaActual)
                                {
                                    if($hora > $horaActual){
                                        $cita = new Cita;

                                        $cita->fecha = date('Y-m-d', strtotime($fecha));
                                        $cita->hora = $hora;
                                        $cita->estadoCita = 7;
                                        $cita->clavePsicologo = null;
                                        $cita->clavePsicologoExterno = $id;

                                        $cita->save();
                                    }
                                }else if($fecha > $fechaActual){
                                    $cita = new Cita;

                                    $cita->fecha = date('Y-m-d', strtotime($fecha));
                                    $cita->hora = $hora;
                                    $cita->estadoCita = 7;
                                    $cita->clavePsicologo = null;
                                    $cita->clavePsicologoExterno = $id;

                                    $cita->save();
                                }
                                
                            }
                        }

                        $respuesta = ['Citas creadas correctamente'];
                        return json_encode($respuesta);
                    }catch(\Exception $e){
                        $respuesta = ['Error' => 'Citas NO creadas'];
                        return json_encode($respuesta);
                    }
                }
            }else if(strlen($id) == 6){
                if($fecha != null && $horas != null){
                    try{
                        foreach($horas as $hora){
                            // Comprobación para verificar que la cita no existe
                            $citaExistente = Cita::where('fecha', date('Y-m-d', strtotime($fecha)))
                            ->where('hora', $hora)
                            ->where('clavePsicologo', $id)
                            ->exists();
                            
                            if(!$citaExistente){
                                if($fecha == $fechaActual)
                                {
                                    if($hora > $horaActual){
                                        $cita = new Cita;

                                        $cita->fecha = date('Y-m-d', strtotime($fecha));
                                        $cita->hora = $hora;
                                        $cita->estadoCita = 7;
                                        $cita->clavePsicologo = $id;
                                        $cita->clavePsicologoExterno = null;

                                        $cita->save();
                                    }
                                }else if($fecha > $fechaActual){
                                    $cita = new Cita;

                                    $cita->fecha = date('Y-m-d', strtotime($fecha));
                                    $cita->hora = $hora;
                                    $cita->estadoCita = 7;
                                    $cita->clavePsicologo = $id;
                                    $cita->clavePsicologoExterno = null;

                                    $cita->save();
                                }
                            }
                        }
                        $respuesta = ['Citas creadas correctamente'];
                        return json_encode($respuesta);
                    }catch(\Exception $e){
                        $respuesta = ['Error' => 'Citas NO creadas'];
                        return json_encode($respuesta);
                    }
                }
            }else if(strlen($id) != 18 && strlen($id) != 6){
                $respuesta = ['Error' => 'ID incorrecto'];
                return json_encode($respuesta);
            }
        }catch(\Exception $e){
            $respuesta = ['Error' => 'Citas NO creadas'];
            return json_encode($respuesta);
        }
    }

    public function deleteDate($idCita){
        $citaInfo = Cita::where('idCita', $idCita)
            ->select('fecha','hora','clavePsicologoExterno','clavePsicologo','claveUnica')
            ->first();
    
        if (!$citaInfo) {
            return response()->json(['error' => 'No se encontró la cita con el ID proporcionado ('+$idCita+')'], 404);
        }

        // Eliminar la cita de la base de datos
        try {
            Cita::where('idCita', $idCita)->delete();
        return response()->json(['message' => 'Cita eliminada correctamente'], 200);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Error al eliminar la cita'], 500);
        }
    }
    
    private function sendCancelMail(Collection $cita, array $alumno,String $id){
        try{
            if((strlen($id) != 6 && strlen($id) != 18) || !$cita->isNotEmpty() || empty($alumno)){
                return "Error";
            }
            
            $details = [
                'hora' => $cita[0]->hora,
                'fecha' => $cita[0]->fecha,
                'name' => $alumno['nombre_alumno'],
                'psicologo' => $cita[0]->{'Nombres psicologo'} . ' ' . $cita[0]->{'Apellido Pat psicologo'} . ' ' . $cita[0]->{'Apellido Mat psicologo'}
            ];

            $correo = 'A' . $alumno['clave_unica'] . '@alumnos.uaslp.mx';
    
            if($alumno['clave_unica'] == $id){
                SendEmail::dispatch($correo,new cancelMailRestriction($details));
                SendEmail::dispatch($cita[0]->correo,new cancelMail($details));
            }else if($cita[0]->idPsicologo = $id){
                SendEmail::dispatch($correo,new cancelMailPsicologo($details));
            }
        }catch(\Exception $e){
            Log::info($e);
            Log::info($alumno);
        }
        
    }
    
    public function cancelDate(Request $request){
        $id = $request->input('id',null);
        $idCita = $request->input('idCita', null);

        if(strlen($id) == 18 || strlen($id) == 6){
            $citaInfo = DB::select('SELECT * FROM view_citas WHERE idCita = ?', [$idCita]);

            $cita = collect($citaInfo);

            if($cita->isNotEmpty()){
                $datosAlumno = $this->AlumnoController->obtainAlumno($cita[0]->claveUnica);
                $alumno = json_decode($datosAlumno, true);

                if($id == $cita[0]->claveUnica){
                    $diaActual = Carbon::now('America/Mexico_City');

                    if($cita[0]->fecha >= $diaActual->copy()->addDays(2)->toDateString()
                        && $cita[0]->estado == "Asistencia sin confirmar"){
                        $cancel = DB::select('SELECT cancelar_cita(?) AS resultado',[$idCita]);

                        if($cancel[0]->resultado == 1){
                            $diaProximo = $diaActual->copy()->addDays(7);
                            $fecha = $diaProximo->toDateString();
                            
                            DB::update('UPDATE alumno SET fechaCancelacion = ? WHERE claveUnica = ?',[$fecha,$alumno['clave_unica']]);
                        
                            $this->sendCancelMail($cita,$alumno,$id);

                            $respuesta = ['Cita cancelada correctamente'];
                            return response($respuesta,200);
                        }else{
                            $respuesta = ['Error' => 'Cita NO cancelada'];
                            return response($respuesta,200);
                        }
                    }else{
                        $respuesta = ['Error' => 'Cita NO cancelada'];
                        return response($respuesta,200);
                    }
                }else if($id == $cita[0]->idPsicologo){
                    $cancel = DB::select('SELECT cancelar_cita(?) AS resultado',[$idCita]);

                    if($cancel[0]->resultado == 1){
                        $this->sendCancelMail($cita,$alumno,$id);

                        $respuesta = ['Cita cancelada correctamente'];
                        return response($respuesta,200);
                    }else{
                        $respuesta = ['Error' => 'Cita NO cancelada'];
                        return response($respuesta,200);
                    }
                }else{
                    $respuesta = ['Error' => 'ID incorrecto'];
                    return response($respuesta,400);
                }               
            }else{
                $respuesta = ['Sin cita agendada'];
                return response($respuesta,404);
            }
        }else{
            $respuesta = ['Error' => 'Cita NO cancelada'];
            return response($respuesta,400);
        }
    }
    
    private function sendConfirmMail(Collection $cita, array $alumno,String $id){
        try{
            if(strlen($id) != 6 || !$cita->isNotEmpty() || empty($alumno)){
                return "Error";
            }
            
            $correoAlumno = 'A' . $alumno['clave_unica'] . '@alumnos.uaslp.mx';

            $details = [
                'hora' => $cita[0]->hora,
                'fecha' => $cita[0]->fecha,
                'name' => $alumno['nombre_alumno'],
                'psicologo' => $cita[0]->{'Nombres psicologo'} . ' ' . $cita[0]->{'Apellido Pat psicologo'} . ' ' . $cita[0]->{'Apellido Mat psicologo'}
            ];
    
            if($alumno['clave_unica'] == $id){
                SendEmail::dispatch($correoAlumno,new confirmDateMail($details));
                SendEmail::dispatch($cita[0]->correo,new confirmDateMailPsicologo($details));
            }
        }catch(\Exception $e){
            Log::info($e);
        }
        
    }

    public function confirmDate(Request $request){
        $id = $request->input('id',null);
        $idCita = $request->input('idCita', null);

        if(strlen($id) == 18 || strlen($id) == 6){
            $citaInfo = DB::select('SELECT * FROM view_citas WHERE idCita = ?', [$idCita]);

            $cita = collect($citaInfo);

            if($cita->isNotEmpty()){

                $datosAlumno = $this->AlumnoController->obtainAlumno($cita[0]->claveUnica);
                $alumno = json_decode($datosAlumno, true);

                $confirm = DB::select('SELECT confirmar_cita(?) AS resultado',[$idCita]);

                if($confirm[0]->resultado == 1){
                    if(!empty($alumno)){
                        $this->sendConfirmMail($cita,$alumno,$id);

                        $respuesta = ['Cita confirmada correctamente'];
                        return response($respuesta,200);
                    }else{
                        $respuesta = ['Error' => 'ID incorrecto'];
                        return response($respuesta,400);
                    }
                }else{
                    $respuesta = ['Error' => 'Cita NO confirmada'];
                    return response($respuesta,200);
                }
            }else{
                $respuesta = ['Sin cita agendada'];
                return response($respuesta,404);
            }
        }else{
            $respuesta = ['Error' => 'Cita NO confirmada'];
            return response($respuesta,400);
        }
    }

    public function actualizarEstadoCita(Request $request, $idCita)
    {
        // Validar que el estado es válido (4 para atendida, 5 para no atendida)
        $validatedData = $request->validate([
            'estadoCita' => 'required|in:4,5',
        ]);

        try {
            // Buscar la cita por idCita
            $cita = Cita::where('idCita', $idCita)->firstOrFail();


            // Actualizar el estatus de la cita
            $cita->estadoCita = $validatedData['estadoCita'];
            $cita->save();

            return response()->json([
                'message' => 'Estatus de la cita actualizado correctamente',
                'cita' => $cita
            ], 200);

        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Error al actualizar el estatus de la cita',
                'message' => $e->getMessage()
            ], 500);
        }
    }
    
    public function obtenerEstatusCita($idCita)
    {
        try {
            // Buscar la cita por idCita
            $cita = Cita::where('idCita', $idCita)->firstOrFail();


            // Retornar el estatus de la cita
            return response()->json([
                'estadoCita' => $cita->estadoCita,
                'message' => 'Estatus de la cita obtenido correctamente'
            ], 200);

        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Error al obtener el estatus de la cita',
                'message' => $e->getMessage()
            ], 500);
        }
    }


}
