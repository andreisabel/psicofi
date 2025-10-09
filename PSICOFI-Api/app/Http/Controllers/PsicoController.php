<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Psicologo;
use App\Models\PsicologoExterno;
use Illuminate\Support\Facades\DB;

class PsicoController extends Controller
{
    public function updatePassword(Request $request){
        $curp = $request->input('curp',null);
        $old = $request->input('contrasena',null);
        $new = $request->input('nuevaContrasena',null);

        if($old == null || $new == null){
            return 0;
        }else{
            $psicologoMod = PsicologoExterno::find($curp);
            if($psicologoMod != null){
                if($old == $psicologoMod->contrasena){
                    $psicologoMod->contrasena = $new;
                    try {
                        if ($psicologoMod->save()) {
                            return true;
                        }else{
                            return 0;
                        }
                    } catch (\Exception $e) {
                        return 0;
                    }
                }else{
                    return 0;
                }
            }else{
                $respuesta = ['Error' => 'Psicólogo no encontrado'];
                return json_encode($respuesta);
            }
        }
    }

    public function searchPsicologo(Request $request){
        $id = $request->input('id',null);

        $psicologos = DB::select('SELECT idPsicologo,
                                        nombres,
                                        apellidoPaterno,
                                        apellidoMaterno,
                                        semestre,
                                        correo,
                                        activo,
                                        carrera 
                                FROM view_psicologos WHERE idPsicologo = ?', [$id]);
        $psicologos = collect($psicologos);

        $psicologo = $psicologos->first();

        if($psicologo){
            if(strlen($psicologo->idPsicologo) == 6){

                $psicologo->claveUnica = $psicologo->idPsicologo;
                unset($psicologo->idPsicologo); 

                return json_encode($psicologo);   
            }else if(strlen($psicologo->idPsicologo) == 18){

                $psicologo->curp = $psicologo->idPsicologo;
                unset($psicologo->idPsicologo);
                
                return json_encode($psicologo);   
            }else{
                $respuesta = ['Error' => 'ID incorrecto'];
                return json_encode($respuesta);
            }
        }else{
            $respuesta = ['Error' => 'Psicólogo no encontrado'];
            return json_encode($respuesta);
        }
    }

    protected function getPsico($clave, $curp){
        if($clave == null){
            $psicologo = PsicologoExterno::where('CURP', $curp)
            ->select('psicologoexterno.CURP',
                    'psicologoexterno.nombres',
                    'psicologoexterno.apellidoPaterno',
                    'psicologoexterno.apellidoMaterno',
                    'psicologoexterno.activo',
            )
            ->first();
            return json_encode($psicologo);
        }
    }

    public function getPsicologos(Request $request){
        $activo = $request->input('activo',null);
        
        if($activo == 1){
            $psicologosExternos = PsicologoExterno::where('activo',true)
            ->select(
                'CURP as identificador',
                'nombres',
                'apellidoPaterno',
                'apellidoMaterno',
                'activo',
                'created_at'
            )
            ->get();
        }else{
            $psicologosExternos = PsicologoExterno::select(
                'CURP as identificador',
                'nombres',
                'apellidoPaterno',
                'apellidoMaterno',
                'activo',
                'created_at'
            )
            ->get();
        }

        foreach ($psicologosExternos as $psicologo) {
            $psicologo->formatted_created_at = $psicologo->created_at->format('Y-m-d');
            $psicologo->makeHidden(['created_at']);
        }

        if($activo == 1){
            $psicologosInternos  = Psicologo::where('activo',true)
            ->select(
                'claveUnica  as identificador',
                'nombres',
                'apellidoPaterno',
                'apellidoMaterno',
                'activo',
                'created_at'
            )
            ->get();
        }else{
            $psicologosInternos  = Psicologo::select(
                'claveUnica  as identificador',
                'nombres',
                'apellidoPaterno',
                'apellidoMaterno',
                'activo',
                'created_at'
            )
            ->get();
        }

        foreach ($psicologosInternos as $psicologo) {
            $psicologo->formatted_created_at = $psicologo->created_at->format('Y-m-d');
            $psicologo->makeHidden(['created_at']);
        }  

        $resultados = array_merge($psicologosExternos->toArray(), $psicologosInternos->toArray());

        return json_encode($resultados);
    }

    public function updatePsicologo(Request $request){
        $clave = $request->input('clave',null);
        $curp = $request->input('curp',null);
        $nombres = $request->input('nombres',null);
        $apellidoPaterno = $request->input('apellidoPaterno',null);
        $apellidoMaterno = $request->input('apellidoMaterno',null);
        $activo = $request->input('activo',null);

        if($clave == null){
            $psicologoMod = PsicologoExterno::find($curp);

            $psicologoMod->nombres = $nombres;
            $psicologoMod->apellidoPaterno = $apellidoPaterno;
            $psicologoMod->apellidoMaterno = $apellidoMaterno;
            $psicologoMod->activo = $activo;
            
            try {
                if ($psicologoMod->save()) {
                    return true;
                }else{
                    return 0;
                }
            } catch (\Exception $e) {
                return 0;
            }

        }else if($curp == null){
            $psicologoMod = Psicologo::find($clave);

            $psicologoMod->nombres = $nombres;
            $psicologoMod->apellidoPaterno = $apellidoPaterno;
            $psicologoMod->apellidoMaterno = $apellidoMaterno;
            $psicologoMod->activo = $activo;
            
            try {
                if ($psicologoMod->save()) {
                    return true;
                }else{
                    return 0;
                }
            } catch (\Exception $e) {
                return 0;
            }
        }else if($curp == null && $clave == null){
            return 0;
        }
        
    }

    public function registerPsicologo(Request $request){
        if(!$request->all()){
            $respuesta = ['Error' => 'Datos inválidos'];
            return json_encode($respuesta);
        }

        $clave = $request->input('claveUnica',null);
        $curp = $request->input('CURP',null);

        if($clave == null && strlen($curp) == 18){
            if(PsicologoExterno::where('CURP',$curp)->exists()){
                $respuesta = ['Error' => 'Psicólogo duplicado'];
                return json_encode($respuesta);
            }

            $psicologo = new PsicologoExterno;

            $psicologo -> CURP = $curp;
            $psicologo -> nombres = $request->nombres;
            $psicologo -> apellidoPaterno = $request->apellidoPaterno;
            $psicologo -> apellidoMaterno = $request->apellidoMaterno;
            $psicologo -> Carrera = $request->Carrera;
            $psicologo -> semestre = $request->semestre;
            $psicologo -> activo = $request->activo;
            $psicologo -> correo = $request->correo;
            $psicologo -> contrasena = $request->contrasena;

            try {
                if ($psicologo->save()) {
                    $respuesta = ['Psicólogo registrado correctamente'];
                    return json_encode($respuesta);
                }else{
                    $respuesta = ['Error' => 'Datos inválidos'];
                    return json_encode($respuesta);
                }
            } catch (\Exception $e) {
                $respuesta = ['Error' => 'Datos inválidos'];
                return json_encode($respuesta);
            }
        }else if($curp == null){
            if(Psicologo::where('claveUnica',$clave)->exists()){
                $respuesta = ['Error' => 'Psicólogo duplicado'];
                return json_encode($respuesta);
            }else{
                $psicologo = new Psicologo;

                $psicologo -> claveUnica = $clave;
                $psicologo -> nombres = $request->nombres;
                $psicologo -> apellidoPaterno = $request->apellidoPaterno;
                $psicologo -> apellidoMaterno = $request->apellidoMaterno;
                $psicologo -> idCarrera = $request->idCarrera;
                $psicologo -> semestre = $request->semestre;
                $psicologo -> activo = $request->activo;
                $psicologo -> correo = $request->correo;
                $psicologo -> contrasena = $request->contrasena;

                try {
                    if ($psicologo->save()) {
                        $respuesta = ['Psicólogo registrado correctamente'];
                        return json_encode($respuesta);
                    }else{
                        $respuesta = ['Error' => 'Datos inválidos'];
                        return json_encode($respuesta);
                    }
                } catch (\Exception $e) {
                    $respuesta = ['Error' => 'Datos inválidos'];
                    return json_encode($respuesta);
                }
            }
        }else if($clave !== null && $curp !== null || strlen($curp) != 18){
            $respuesta = ['Error' => 'Datos inválidos'];
            return json_encode($respuesta);
        }
    }

    public function getPatients(Request $request){
        $id = $request->input('id',null);

        $alumnos = DB::table('view_citas')
            ->select('claveUnica')
            ->where('idPsicologo',$id)
            ->where('estado','Atendida')
            ->distinct()
            ->get();

        if($alumnos->isEmpty()){
            $respuesta = ['Error' => 'Psicólogo sin alumnos atendidos'];
            return response($respuesta,204);
        }else{
            foreach($alumnos as $alumno){
                $claves[] = $alumno->claveUnica;
            }
            return response($claves,200);
        }
    }
}
