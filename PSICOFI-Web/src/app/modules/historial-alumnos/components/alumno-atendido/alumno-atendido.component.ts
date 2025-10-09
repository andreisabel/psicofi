import { Component } from '@angular/core';
import { HistorialAlumnosService } from '../../services/historial-alumnos.service';


interface AlumnoAtendido {
  claveUnica: number;
  nombres: string;
  apellidoPaterno: string;
  apellidoMaterno: string;
  area: string;
  carrera: string;
  semestre: number;
  asesor: string;
  condicionAcademica: string;
  promedioGral: number;
  creditosAprobados: number;
  creditosInscritos: number;
  sexo: string;
  edad: number;
}

@Component({
  selector: 'app-alumno-atendido',
  templateUrl: './alumno-atendido.component.html',
  styleUrls: ['./alumno-atendido.component.css']
})

export class AlumnoAtendidoComponent {
  public isLoading = false;
  public clave: string = '';
  constructor(private histo: HistorialAlumnosService) {
    this.clave = histo.alumnoViendo;
    this.getAlumnoAtendidoInfo();
  }


  public getAlumnoAtendidoInfo(): void {
    this.isLoading = true;
    this.histo.getAlumnoInfo().subscribe((data) => {
      this.histo.infoAlumno = data;
      this.isLoading = false;
    },
      (error) => {
        console.error('Error al obtener alumno:', error);
        this.isLoading = false;
      })
  }

  public get alumnoInfo(): AlumnoAtendido {
    return this.histo.infoAlumno;
  }

  public back(): void {
    this.histo.historialTablaVisible = 1;
  }
}
