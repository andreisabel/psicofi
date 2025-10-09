import { Component } from '@angular/core';
import { HistorialAlumnosService } from '../../services/historial-alumnos.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tabla-historial-citas',
  templateUrl: './tabla-historial-citas.component.html',
  styleUrls: ['./tabla-historial-citas.component.css']
})
export class TablaHistorialCitasComponent {
  
  public isLoading = false;
  public ordenAscendente: boolean = true;

  constructor(private histo: HistorialAlumnosService, private router: Router) {
    this.getHistorialCitas();
  }

  public getHistorialCitas(): void {
    this.isLoading = true;
    this.histo.getHistorialCitas().subscribe((data) => {
      this.histo.records = Array.isArray(data) ? data : [];

      this.histo.records.sort((a: { fecha: string }, b: { fecha: string }) => {
        const fechaA = new Date(a.fecha);
        const fechaB = new Date(b.fecha);
        return fechaA.getTime() - fechaB.getTime();
      });

      this.isLoading = false;
    },
    (error) => {
      console.error('Error al obtener historial de citas:', error);
      this.isLoading = false;
    });
  }

  public get records() {
    return this.histo.records;
  }

  redirectToReporteCitas(id: number) {
    this.router.navigate(['/reporte-citas', id]);
  }

  private ordenarCitas(): void {
    this.histo.records.sort((a: { fecha: string }, b: { fecha: string }) => {
      const fechaA = new Date(a.fecha);
      const fechaB = new Date(b.fecha);
      if (this.ordenAscendente) {
        return fechaA.getTime() - fechaB.getTime();
      } else {
        return fechaB.getTime() - fechaA.getTime();
      }
    });
  }

  public toggleOrden(): void {
    this.ordenAscendente = !this.ordenAscendente;
    this.ordenarCitas();
  }
}
