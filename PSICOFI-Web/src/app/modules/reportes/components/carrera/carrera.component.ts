import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { ReportesService } from '../../servicios/reportes.service';

@Component({
  selector: 'app-carrera',
  templateUrl: './carrera.component.html',
  styleUrls: ['./carrera.component.css']
})
export class CarreraComponent implements OnInit {
  selectedCarrera: string = '';
  fechaInicial: string = '';
  fechaFinal: string = '';
  carreras: any[] = []; 

  @Output() onGenerateReport = new EventEmitter<{ carrera: string, fechaInicial: string, fechaFinal: string }>();

  constructor(private reportesService: ReportesService) { }

  ngOnInit() {
    this.obtenerAreas();
  }

  obtenerAreas() {
    this.reportesService.obtenerAreasCarreras('carrera').subscribe(data => {
      this.carreras = data;
      if (this.carreras.length > 0) {
        this.selectedCarrera = this.carreras[0].id;
      }
    });
  }

}
