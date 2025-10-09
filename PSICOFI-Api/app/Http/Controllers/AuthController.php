<?php

namespace App\Http\Controllers;

use App\Models\Administrador;
use Illuminate\Http\Request;
use App\Models\Alumno;
use App\Models\PsicologoExterno;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class AuthController extends Controller
{
    // Función para validar administradores por medio del web service
    private function authWebAdmin($rpe,$password){
        $location = env('WEB_SERVICE');
        $request = '<s:Envelope xmlns:s="http://schemas.xmlsoap.org/soap/envelope/">
                        <s:Body>
                            <valida_usuario xmlns="http://tempuri.org/">
                            <key_sw>'.htmlspecialchars(env('SERVICE_KEY')).'</key_sw>
                            <rpe_usuario>'. $rpe .'</rpe_usuario>
                            <contrasena>'. htmlspecialchars($password) .'</contrasena>
                            </valida_usuario>
                        </s:Body>
                    </s:Envelope>';
        $headers = [
            'Method: POST',
            'Connection: Keep-Alive',
            'User-Agent: PHP-SOAP-CURL',
            'Content-Type: text/xml',
            'SOAPAction: http://tempuri.org/IService1/valida_usuario'
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
            return ['validacion' => 'USUARIO-INVALIDO'];
        }
    }

    public function AlumnoService(Request $request){
        $id = $request->input('id',null);
        $password = $request->input('password',null);

        $respuesta = $this->auth_admin($id,$password);
        return $respuesta;
    }

    // Función para validar alumnos por medio del web service
    private function authWebStudent($clave,$password){
        $location = env('WEB_SERVICE');
        $request = '<s:Envelope xmlns:s="http://schemas.xmlsoap.org/soap/envelope/">
                        <s:Body>
                        <valida_alumno xmlns="http://tempuri.org/">
                            <key_sw>'.htmlspecialchars(env('SERVICE_KEY')).'</key_sw>
                            <clave_unica>'. $clave .'</clave_unica>
                            <contrasena>'. htmlspecialchars($password) .'</contrasena>
                        </valida_alumno>
                        </s:Body>
                    </s:Envelope>';
        $headers = [
            'Method: POST',
            'Connection: Keep-Alive',
            'User-Agent: PHP-SOAP-CURL',
            'Content-Type: text/xml',
            'SOAPAction: http://tempuri.org/IService1/valida_alumno'
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
            return ['validacion' => "USUARIO-INVALIDO"];
        }
    }

    // Función para validar alumnos
    private function auth_student($id,$password){
        $lenID = strlen($id);

        if($lenID != 6 || !is_numeric($id)){
            return ['validacion' => 'USUARIO-INVALIDO'];
        }

        $arrayDatos = json_decode($this->authWebStudent($id, $password), true);

        if($arrayDatos['validacion'] == 'USUARIO-VALIDO'){
            $arrayDatos['id'] = $arrayDatos['clave_unica'];
            unset($arrayDatos['clave_unica']);

            $arrayDatos['nombre'] = $arrayDatos['nombre_alumno'];
            unset($arrayDatos['nombre_alumno']);

            unset($arrayDatos['situacion_alumno']);

            $arrayDatos['rol'] = "Alumno";
            
            return $arrayDatos;
        }
        
        return ['validacion' => 'USUARIO-INVALIDO'];
    }

    // Función para validar psicologos
    private function auth_psico($id,$password){
        $lenID = strlen($id);

        $psicologo = DB::table('view_psicologos')
                ->where('idPsicologo', $id)
                ->where('activo', '=', 1)
                ->exists();

        if(!$psicologo){
            return ['validacion' => "USUARIO-INVALIDO"];
        }

        if($lenID != 6 && $lenID <= 10 && is_numeric($id)){

            $arrayDatos = json_decode($this->authWebAdmin($id, $password), true);

            if($arrayDatos['validacion'] == 'USUARIO-VALIDO'){
                $arrayDatos['id'] = $arrayDatos['rpe_usuario'];
                unset($arrayDatos['rpe_usuario']);

                $arrayDatos['rol'] = "Psicologo";
                
                return $arrayDatos;
            }

            return ['validacion' => "USUARIO-INVALIDO"];
        }

        if($lenID == 6 && is_numeric($id)){
            $arrayDatos = json_decode($this->authWebStudent($id, $password), true);

            if($arrayDatos['validacion'] == 'USUARIO-NO-FACULTAD'){
                $arrayDatos['validacion'] = 'USUARIO-VALIDO';

                $arrayDatos['id'] = $arrayDatos['clave_unica'];
                unset($arrayDatos['clave_unica']);

                $arrayDatos['nombre'] = $arrayDatos['nombre_alumno'];
                unset($arrayDatos['nombre_alumno']);

                unset($arrayDatos['situacion_alumno']);

                $arrayDatos['rol'] = "Psicologo";
                
                return $arrayDatos;
            }
            return ['validacion' => "USUARIO-INVALIDO"];
        }else if($lenID == 18){
            $psicologoexterno = PsicologoExterno::where('CURP', $id)
            ->where('contrasena', $password)
            ->where('activo', '=', 1)
            ->select('psicologoexterno.curp',
                    'psicologoexterno.nombres',
                    'psicologoexterno.apellidoPaterno',
                    'psicologoexterno.apellidoMaterno',
            )
            ->first();

            if(!$psicologoexterno){
                return ['validacion' => "USUARIO-INVALIDO"];
            }else{
                $arrayDatos = [
                    'id' => $psicologoexterno->curp,
                    'nombre' => $psicologoexterno->nombres . ' ' . $psicologoexterno->apellidoPaterno . ' ' . $psicologoexterno->apellidoMaterno,
                    'validacion' => "USUARIO-VALIDO",
                    'rol' => "Psicologo externo"
                ];

                return $arrayDatos;
            }
        }else{
            return ['validacion' => "USUARIO-INVALIDO"];
        }
    }

    // Función para validar administradores
    private function auth_admin($id,$password){
        if(!is_numeric($id) || strlen($id) > 10){
            return ['validacion' => "USUARIO-INVALIDO"];
        }

        //$arrayDatos = json_decode($this->authWebStudent($id, $password), true);
        $arrayDatos = json_decode($this->authWebAdmin($id, $password), true);

        if($arrayDatos['validacion'] == 'USUARIO-VALIDO'){
            $administrador = Administrador::where('idUsuario', $id)
            ->exists();

            // if($administrador == 1){
            //     $arrayDatos['id'] = $arrayDatos['clave_unica'];
            //     unset($arrayDatos['clave_unica']);

            //     unset($arrayDatos['situacion_alumno']);
            //     unset($arrayDatos['nombre_alumno']);

            //     $arrayDatos['rol'] = "Administrador";
                
            //     return $arrayDatos;
            // }
            
            if($administrador == 1){
                $arrayDatos['id'] = $arrayDatos['rpe_usuario'];
                unset($arrayDatos['rpe_usuario']);

                $arrayDatos['rol'] = "Administrador";
                $jsonResult = json_encode($arrayDatos);
                
                return $jsonResult;
            }
            return ['validacion' => "USUARIO-INVALIDO"];
        }

        return ['validacion' => "USUARIO-INVALIDO"];
    }

    // Función para login de administradores
    public function loginAdmin(Request $request){
        $id = $request->input('id',null);
        $password = $request->input('password',null);

        $lenID = strlen($id);

        // if(($lenID != 6) || $id == null){
        //     return response()->json(['validacion' => 'USUARIO-INVALIDO'], 200);
        // }

        $admin = $this->auth_admin($id,$password);
        
        if($admin['validacion'] == 'USUARIO-VALIDO'){
            return response($admin,200);
        }

        return response()->json(['validacion' => 'USUARIO-INVALIDO'], 200);
    }

    // Función para login de psicologos y alumnos
    public function login(Request $request){
        $id = $request->input('id',null);
        $password = $request->input('password',null);

        $lenID = strlen($id);

        // if(($lenID != 6 && $lenID != 18) || $id == null){
        //     return response()->json(['validacion' => 'USUARIO-INVALIDO'], 200);
        // }

        $alumno = $this->auth_student($id,$password);

        // $alumno = [
        //     'validacion' => 'USUARIO-INVALIDO'
        // ];
    
        if($alumno['validacion'] == 'USUARIO-INVALIDO'){
            $psicologo = $this->auth_psico($id,$password);

            if($psicologo['validacion'] == 'USUARIO-VALIDO'){
                return response($psicologo,200);
            }else{
                return response()->json(['validacion' => 'USUARIO-INVALIDO'], 200);
            }
        }else if($alumno['validacion'] == 'USUARIO-VALIDO'){
            return response($alumno,200);
        }
    }

    public function getAlumno(Request $request){
        $clave = $request->input('clave');

        if($clave){
            return $clave;
        }else{
            $jsonResult = $this->getUser($clave);

            $arrayDatos = json_decode($jsonResult, true);

            return $arrayDatos;
        }
    }

    public function index(){
        $alumnos = Alumno::all();
        return $alumnos;
    }
}
