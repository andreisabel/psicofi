import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ReporteCitasService } from './services/reporte-citas.service';

@Component({
  selector: 'app-reporte-citas',
  templateUrl: './reporte-citas.page.html',
  styleUrls: ['./reporte-citas.page.css']
})
export class ReporteCitasPage implements OnInit {
  idCita: number | null = null;
  notaCita: any;

  constructor(private route: ActivatedRoute,
    private reporteCitaService: ReporteCitasService,
    private _router: Router,
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.idCita = +params.get('idCita')!;
      if (this.idCita) {
        this.obtenerReporteCita(this.idCita);
      }
    });
  }

  obtenerReporteCita(idCita: number): void {
    this.reporteCitaService.getReporteCita(idCita).subscribe(
      response => {
        this.notaCita = response.notaCita;
      },
      error => {
        console.error('Error al obtener el reporte de la cita:', error);
        this._router.navigate(['/historial-alumnos']);
      }
    );
  }
}