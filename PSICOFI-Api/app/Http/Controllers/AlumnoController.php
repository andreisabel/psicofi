<?php

namespace App\Http\Controllers;

use App\Models\Alumno;
use Illuminate\Http\Request;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class AlumnoController extends Controller
{
    public function obtenerAlumno($claveUnica) {
        $alumno = Alumno::where('claveUnica', $claveUnica)->first();
        return response()->json($alumno);
    }

    // Función para obtener la información de un alumno por medio del web service
    public function obtainAlumno($id){
        $clave_unica = (int) $id; 
        $location = env('WEB_SERVICE');
        $request = '<s:Envelope xmlns:s="http://schemas.xmlsoap.org/soap/envelope/">
                        <s:Body>
                        <alumno xmlns="http://tempuri.org/">
                            <key_sw>'.env('SERVICE_KEY').'</key_sw>
                            <clave_unica>' . $clave_unica . '</clave_unica>
                        </alumno>
                        </s:Body>
                    </s:Envelope>';
        $headers = [
            'Method: POST',
            'Connection: Keep-Alive',
            'User-Agent: PHP-SOAP-CURL',
            'Content-Type: text/xml',
            'SOAPAction: http://tempuri.org/IService1/alumno'
        ];

        $ch = curl_init($location);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
        curl_setopt($ch, CURLOPT_POST, true);
        curl_setopt($ch, CURLOPT_POSTFIELDS, $request);
        curl_setopt($ch, CURLOPT_HTTP_VERSION, CURL_HTTP_VERSION_1_1);
        curl_setopt($ch, CURLOPT_HTTPAUTH, CURLAUTH_BASIC);

        $response = curl_exec($ch);

        $xml = new \SimpleXMLElement($response);
        $datos = $xml->xpath('//TablaMensaje');

        try{
            $jsonResult = json_encode($datos[0]);
            return $jsonResult;
        }catch (\Exception $e){
            return ['validacion' => "RESULTADO-INVALIDO"];
        }
    }

    private function calcularEdad($fechaNacimiento) {

        $fechaSinHora = substr($fechaNacimiento, 0, strpos($fechaNacimiento, ' '));
        $fechaCarbon = Carbon::createFromFormat('d/m/Y', $fechaSinHora);
        $edad = $fechaCarbon->age;

        return $edad;
    }

    function removerAcentos($cadena) {
        $buscar = ['á', 'é', 'í', 'ó', 'ú', 'Á', 'É', 'Í', 'Ó', 'Ú', 'ñ', 'Ñ'];
        $reemplazar = ['a', 'e', 'i', 'o', 'u', 'A', 'E', 'I', 'O', 'U', 'n', 'N'];
        return str_replace($buscar, $reemplazar, $cadena);
    }

    public function addAlumno($id){
        $alumno = $this->obtainAlumno($id);

        if($alumno == null){
            return null;
        }

        if($alumno){
            $alumno = json_decode($alumno, true);
            $carrera = $this->removerAcentos($alumno['nombre_carrera']);
            $area = $this->removerAcentos($alumno['nombre_area']);

            $newAlumno = new Alumno;

            $newAlumno -> claveUnica = intval($alumno['clave_unica']);
            $newAlumno -> carrera = $carrera;
            $newAlumno -> area = $area;
            $newAlumno -> semestre = intval($alumno['semestre']);
            $newAlumno -> fechaCancelacion = null;
            
            if($newAlumno->save()){
                return $newAlumno;
            }else{
                return false;
            }
        }else{
            return null;
        }
    }

    public function getAlumno(Request $request){
        $id = $request->input('id',null);

        if(!is_numeric($id) || !strlen($id) == 6){
            $respuesta = ['Error' => 'Consulta incorrecta'];
            return response($respuesta,400);
        }

        $alumno = json_decode($this->obtainAlumno($id), true);

        if($alumno['validacion'] == 'RESULTADO-VALIDO'){
            $datos = [
                'claveUnica' => $alumno['clave_unica'],
                'nombres' => $alumno['nombres_alumno'],
                'apellidoMaterno' => $alumno['segundo_apellido_alumno'],
                'apellidoPaterno' => $alumno['primer_apellido_alumno'],
            ];
            return response($datos,200);
        }

        $respuesta = ['Error' => 'Alumno NO encontrado'];  
        return response($respuesta,200);
    }

    public function getDataAlumno(Request $request){
        $id = $request->input('id',null);

        if(!is_numeric($id) || !strlen($id) == 6){
            $respuesta = ['Error' => 'Consulta incorrecta'];
            return response($respuesta,400);
        }

        $alumno = json_decode($this->obtainAlumno($id), true);

        if($alumno['validacion'] == 'RESULTADO-VALIDO'){
            $edad = $this->calcularEdad($alumno['fecha_nace']);
            $datos = [
                'claveUnica' => $alumno['clave_unica'],
                'nombres' => $alumno['nombres_alumno'],
                'apellidoMaterno' => $alumno['segundo_apellido_alumno'],
                'apellidoPaterno' => $alumno['primer_apellido_alumno'],
                'semestre' => $alumno['semestre'],
                'area' => $alumno['nombre_area'],
                'carrera' => $alumno['nombre_carrera'],
                'asesor' => $alumno['tutor_academico'],
                'condicionAcademica' => $alumno['condicion'],
                'promedioGral' => $alumno['promedio_general'],
                'edad' => $edad,
                'sexo' => $alumno['genero'],
                'creditosInscritos' => $alumno['creditos_inscritos'],
                'creditosAprobados' => $alumno['semestre'] * 50
            ];
            return response($datos,200);
        }

        $respuesta = ['Error' => 'Alumno NO encontrado'];  
        return response($respuesta,200);
    }

    public function getRecord(Request $request){
        $id = $request->input('id',null);
        
        try{
            if(strlen($id) == 6){
                $Record = [];

                $citas = DB::select('call get_historial_alumno(?)',[$id]);

                $citas = collect($citas);

                if($citas->isNotEmpty()){
                    return json_encode($citas);
                }else{
                    $respuesta = ['Sin historial'];
                    return json_encode($respuesta);
                }
            }else{
                $respuesta = ['Error' => 'ID invalido'];
                return json_encode($respuesta);
            }
        }catch(\Exception $e){
            $respuesta = ['Error' => 'Ocurrio un error'];
            return json_encode($respuesta);
        }
    }

    public function getDate(Request $request){
        $id = $request->input('id',null);
        
        try{
            if(strlen($id) == 6){
                $cita = DB::select('call get_cita_actual(?)',[$id]);

                $cita = collect($cita);

                if($cita->isNotEmpty()){
                    return json_encode($cita[0]);
                }else{
                    $respuesta = ['Sin cita agendada'];
                    return json_encode($respuesta);
                }
            }else{
                $respuesta = ['Error' => 'ID incorrecto'];
                return json_encode($respuesta);
            }
        }catch(\Exception $e){
            $respuesta = ['Error' => 'Ocurrio un error'];
            return json_encode($respuesta);
        }
    }
}
