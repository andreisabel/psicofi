import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ReporteCitasService } from '../../services/reporte-citas.service';
import { Cita } from 'src/app/components/servicios/citas.service';
import { Alumno } from 'src/app/model/alumno.model';

@Component({
  selector: 'app-datos-reporte-cita',
  templateUrl: './datos-reporte-cita.component.html',
  styleUrls: ['./datos-reporte-cita.component.css']
})
export class DatosReporteCitaComponent implements OnInit {
  public isLoading = false;
  constructor(
    private route: ActivatedRoute,
    private _router:Router, 
    private reporteCitaService:ReporteCitasService,
  ){}
  idCita =0;
  public cita : Cita | null = null;
  public alumno : Alumno | null = null;

  ngOnInit(): void {
    this.isLoading = true;
    this.route.paramMap.subscribe(params => {
      this.idCita = +params.get('idCita')!;
      if (this.idCita) {
        this.getCita(this.idCita);
      }
      this.isLoading = false;
    });  
  }

  getCita(idCita: number): void {
    this.isLoading = true;
    this.reporteCitaService.getCita(idCita).subscribe(
      response => {
        this.cita = response;
        this.getAlumno(this.cita.claveUnica);
        this.isLoading = false;
      },
      error => {
        console.error('Error al obtener la cita:', error);
        this._router.navigate(['/historial-alumnos']);
        this.isLoading = false;
      }
    );
  }

  getAlumno(claveUnica: number): void {
    this.isLoading = true;
    this.reporteCitaService.getAlumno(claveUnica).subscribe(
      response => {
        this.alumno = response;
        this.isLoading = false;
      },
      error => {
        console.error('Error al obtener la cita:', error);
        this._router.navigate(['/historial-alumnos']);
        this.isLoading = false;
      }
    );
  }


}
