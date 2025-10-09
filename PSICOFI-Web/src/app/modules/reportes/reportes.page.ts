import { Component } from '@angular/core';

@Component({
  selector: 'app-reportes',
  templateUrl: './reportes.page.html',
  styleUrls: ['./reportes.page.css']
})
export class ReportesPage {
  selectedArea: string = '';
  fechaInicial: string = '';
  fechaFinal: string = '';

  onReportGenerated(event: { area: string, fechaInicial: string, fechaFinal: string }) {
    this.selectedArea = event.area;
    this.fechaInicial = event.fechaInicial;
    this.fechaFinal = event.fechaFinal;
  }
}
