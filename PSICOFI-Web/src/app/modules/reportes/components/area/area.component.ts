import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { ReportesService } from '../../servicios/reportes.service';

@Component({
  selector: 'app-area',
  templateUrl: './area.component.html',
  styleUrls: ['./area.component.css']
})
export class AreaComponent implements OnInit {
  selectedArea: string = '';
  fechaInicial: string = '';
  fechaFinal: string = '';
  areas: any[] = []; 

  @Output() onGenerateReport = new EventEmitter<{ area: string, fechaInicial: string, fechaFinal: string }>();

  constructor(private reportesService: ReportesService) { }

  ngOnInit() {
    this.obtenerAreas();
  }

  obtenerAreas() {
    this.reportesService.obtenerAreasCarreras('area').subscribe(data => {
      this.areas = data;
      if (this.areas.length > 0) {
        this.selectedArea = this.areas[0].id;
      }
    });
  }
}
