<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;

class ReporteController extends Controller
{   
    public function getAreasCarreras(Request $request){
        $tipo = $request->input('tipo',null);

        $consulta = null;
        $datos = [];

        if($tipo == "carrera"){
            $consulta = DB::select("SELECT DISTINCT carrera FROM view_reportes;");

            foreach ($consulta as $fila => $dato) {
                array_push($datos,$dato->carrera);
            }

        }else if($tipo == "area"){
            $consulta = DB::select("SELECT DISTINCT areaConsulta FROM view_reportes;");

            foreach ($consulta as $fila => $dato) {
                array_push($datos,$dato->areaConsulta);
            }

        }else{
            $respuesta = ['Error' => 'Consulta incorrecta'];
            return json_encode($respuesta);
        }

        return $datos;
    }

    public function getReporte(Request $request){
        $tipo = $request->input('tipo',null);
        $nombre = $request->input('nombre',null);
        $inicio = $request->input('fecha_inicio',null);
        $final = $request->input('fecha_final',null);

        $consulta = null;

        if($tipo == "carrera"){
            $consulta = DB::select("SELECT * FROM view_reportes 
                                    WHERE fecha BETWEEN ? AND ?
                                    AND carrera LIKE ?", [$inicio,$final,'%'.$nombre.'%']);
            if(!$consulta){
                $respuesta = ['Error' => 'Sin datos'];
                return json_encode($respuesta);
            }
        }else if($tipo == "area"){
            $consulta = DB::select("SELECT * FROM view_reportes 
                                    WHERE fecha BETWEEN ? AND ?
                                    AND areaConsulta LIKE ?", [$inicio,$final,'%'.$nombre.'%']);
                                    
            if(!$consulta){
                $respuesta = ['Error' => 'Sin datos'];
                return json_encode($respuesta);
            }
        }else if($tipo == "facultad"){
            $consulta = DB::select("SELECT * FROM view_reportes 
                                    WHERE fecha BETWEEN ? AND ?", [$inicio,$final]);

            if(!$consulta){
                $respuesta = ['Error' => 'Sin datos'];
                return json_encode($respuesta);
            }
        }else{
            $respuesta = ['Error' => 'Consulta incorrecta'];
            return json_encode($respuesta);
        }

        $collection = collect($consulta);

        $alumnos = $collection->unique('claveUnica')->count();

        $citas = $collection->count();

        $total_horarios = $collection->pluck('horarioAtencion')->countBy();

        $horarios = [];

        foreach ($total_horarios as $horario => $cantidad) {
            $horarios[] = [$horario, $cantidad];
        }

        $total_semestres = $collection->select(['claveUnica','semestre'])->unique();
        $t_semestres = $total_semestres->pluck('semestre')->countBy();

        $semestres = [];

        foreach ($t_semestres as $semestre => $cantidad){
            $semestres[] = ["{$semestre}° Semestre", $cantidad];
        }

        $total_areaConsultas = $collection->pluck('Area')->map(function ($area) {
            return preg_replace('/^Licenciatura en\s+/i', '', $area);
        })->countBy();

        $areaConsultas = [];

        foreach ($total_areaConsultas as $area => $cantidad){
            $areaConsultas[] = [$area, $cantidad];
        }

        $total_motivos = $collection->pluck('motivoConsulta')->countBy();

        $motivos = [];
        foreach ($total_motivos as $motivo => $cantidad){
            $motivos[] = [$motivo, $cantidad];
        }

        $result = [
            'totalPersonasAtendidas' => $alumnos,
            'totalCitas' => $citas,
            'horarioAtencion' => $horarios,
            'semestre' => $semestres,
            'areaConsulta' => $areaConsultas,
            'motivoConsulta' => $motivos
        ];

        if($tipo == "area"){

            $total_carreras = $collection->select(['claveUnica','carrera'])->unique();
            $t_carreras = $total_carreras->pluck('carrera')->countBy();

            $carreras = [];
            foreach ($t_carreras as $carrera => $cantidad){
                $carreras[] = [$carrera, $cantidad];
            }
            
            $result['personasPorCarrera'] = $carreras;
        }else if($tipo == "facultad"){
            $total_carreras = $collection->select(['claveUnica','carrera'])->unique();
            $t_carreras = $total_carreras->pluck('carrera')->countBy();

            $carreras = [];
            foreach ($t_carreras as $carrera => $cantidad){
                $carreras[] = [$carrera, $cantidad];
            }

            $total_areas = $collection->select(['claveUnica','areaConsulta'])->unique();
            $t_areas = $total_areas->pluck('areaConsulta')->countBy();

            $areas = [];
            foreach ($t_areas as $area => $cantidad){
                $areas[] = [$area, $cantidad];
            }

            $result['personasPorCarrera'] = $carreras;
            $result['personasPorArea'] = $areas;
        }

        return $result;
    }
}