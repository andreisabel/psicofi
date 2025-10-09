import { Component, Input, OnInit, HostListener  } from '@angular/core';
import { ReportesService } from '../../servicios/reportes.service';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const CHART_TYPES = ['bar', 'pie'] as const;
type ChartType = typeof CHART_TYPES[number];

@Component({
  selector: 'app-graficas',
  templateUrl: './graficas.component.html',
  styleUrls: ['./graficas.component.css']
})
export class GraficasComponent implements OnInit {

  ngOnInit() {
    this.checkScreenSize();
  }

  @Input() tipo: string = '';
  @Input() fechaInicial: string = '';
  @Input() fechaFinal: string = '';
  @Input() nombre: string = '';
  @HostListener('window:resize', ['$event'])onResize(event: Event) {
    this.checkScreenSize();
  }
  
  datosReporte: any;
  showCharts: boolean = false;
  sizeScreen: boolean = true;
  showArea: boolean = false;
  showCarrera: boolean = false; 
  dataPersonasPorCarrera: any[] = [];
  dataPersonasPorArea: any[] = [];
  dataHorarioAtencion: any[] = [];
  dataSemestres: any[] = [];
  dataAreaConsulta: any[] = [];
  dataMotivoConsulta: any[] = [];
  colors = {
    backgroundColor: [
      'rgba(255, 99, 132, 0.5)',
      'rgba(54, 162, 235, 0.5)',
      'rgba(255, 206, 86, 0.5)',
      'rgba(75, 192, 192, 0.5)',
      'rgba(153, 102, 255, 0.5)',
      'rgba(255, 159, 64, 0.5)',
      'rgba(199, 199, 199, 0.5)',
      'rgba(83, 102, 255, 0.5)',
      'rgba(255, 105, 180, 0.5)',
      'rgba(0, 255, 255, 0.5)',
      'rgba(255, 69, 0, 0.5)',
      'rgba(0, 255, 0, 0.5)',
    ],
    borderColor: [
      'rgba(255, 99, 132, 1)',
      'rgba(54, 162, 235, 1)',
      'rgba(255, 206, 86, 1)',
      'rgba(75, 192, 192, 1)',
      'rgba(153, 102, 255, 1)',
      'rgba(255, 159, 64, 1)',
      'rgba(199, 199, 199, 1)',
      'rgba(83, 102, 255, 1)',
      'rgba(255, 105, 180, 1)',
      'rgba(0, 255, 255, 1)',
      'rgba(255, 69, 0, 1)',
      'rgba(0, 255, 0, 1)',
    ]
  };

  chartLabelsPersonasPorCarrera: string[] = [];
  chartDataPersonasPorCarrera: any[] = [];

  chartLabelsPersonasPorArea: string[] = [];
  chartDataPersonasPorArea: any[] = [];

  chartLabelsHorarioAtencion: string[] = [];
  chartDataHorarioAtencion: any[] = [];

  chartLabelsSemestres: string[] = [];
  chartDataSemestres: any[] = [];

  chartLabelsAreaConsulta: string[] = [];
  chartDataAreaConsulta: any[] = [];

  chartLabelsMotivoConsulta: string[] = [];
  chartDataMotivoConsulta: any[] = [];

  selectedChartType: ChartType = 'bar';

  chartOptions: any = {};
  chartLegend = true;
  chartPlugins: any[] = [];
  alertaVisible: boolean = false;
  errorMessage: string = '';

  constructor(private reportesService: ReportesService) { }

  generarReporte() {
    if (this.fechaInicial && this.fechaFinal && (this.fechaFinal>=this.fechaInicial)) {
      if(this.tipo!='facultad' && this.nombre==undefined) {
        this.errorMessage = 'Por favor, selecciona la carrera o el área.';
        this.alertaVisible = true;
        setTimeout(() => {
          this.alertaVisible = false;
        }, 3000);
        return;
      }
      this.reportesService.obtenerReporte(this.tipo, this.nombre, this.fechaInicial, this.fechaFinal)
        .subscribe(data => {
          if (data.Error) {
            this.errorMessage = "No hay citas en las fechas seleccionadas. Por favor, elija otras fechas.";
            this.showCharts = false;
            this.alertaVisible = true;
              setTimeout(() => {
              this.alertaVisible = false;
            }, 3000);
  
          } else {
            this.datosReporte = data;
            this.prepararDatos();
            this.showCharts = true;
          }
        });
    } else {
      this.errorMessage = 'Por favor seleccione las fechas correctamente.';
      this.alertaVisible = true;
      setTimeout(() => {
        this.alertaVisible = false;
      }, 3000);
    }
  }
  
  showScreenSize(){

  }

  prepararDatos() {
    if (this.datosReporte) {
      this.chartOptions = {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          }
        }
      };
  
      if (this.tipo === 'area' || this.tipo === 'facultad') {
        this.showCarrera = true;
        this.dataPersonasPorCarrera = this.datosReporte['personasPorCarrera'] || [];
        if(this.dataPersonasPorCarrera){
          this.dataPersonasPorCarrera.sort();
        }
        const percentagesCarrera = this.calcularPorcentaje(this.dataPersonasPorCarrera);
        this.chartLabelsPersonasPorCarrera = percentagesCarrera;
        this.chartDataPersonasPorCarrera = [{
          data: this.dataPersonasPorCarrera.map(arr => arr[1]),
          backgroundColor: this.colors.backgroundColor,
          borderColor: this.colors.borderColor,
          borderWidth: 1
        }];
      }
  
      if (this.tipo === 'facultad') {
        this.showArea = true;
        this.dataPersonasPorArea = this.datosReporte['personasPorArea'] || [];
        if(this.dataPersonasPorArea){
          this.dataPersonasPorArea.sort();
        }
        const percentagesArea = this.calcularPorcentaje(this.dataPersonasPorArea);
        this.chartLabelsPersonasPorArea = percentagesArea;
        this.chartDataPersonasPorArea = [{
          data: this.dataPersonasPorArea.map(arr => arr[1]),
          backgroundColor: this.colors.backgroundColor,
          borderColor: this.colors.borderColor,
          borderWidth: 1
        }];
      }
  
      this.dataHorarioAtencion = this.datosReporte['horarioAtencion'] || [];
      this.dataSemestres = this.datosReporte['semestre'] || [];
      this.dataAreaConsulta = this.datosReporte['areaConsulta'] || [];
      this.dataMotivoConsulta = this.datosReporte['motivoConsulta'] || [];

      if(this.dataHorarioAtencion){
        this.dataHorarioAtencion.sort();
      }
      if(this.dataSemestres){
        this.dataSemestres.sort();
      }
      if(this.dataAreaConsulta){
        this.dataAreaConsulta.sort();
      }
      if(this.dataMotivoConsulta){
        this.dataMotivoConsulta.sort();
      }
  
      const percentagesHorarioAtencion = this.calcularPorcentaje(this.dataHorarioAtencion);
      this.chartLabelsHorarioAtencion = percentagesHorarioAtencion;
      this.chartDataHorarioAtencion = [{
        data: this.dataHorarioAtencion.map(arr => arr[1]),
        backgroundColor: this.colors.backgroundColor,
        borderColor: this.colors.borderColor,
        borderWidth: 1
      }];
  
      const percentagesSemestres = this.calcularPorcentaje(this.dataSemestres);
      this.chartLabelsSemestres = percentagesSemestres;
      this.chartDataSemestres = [{
        data: this.dataSemestres.map(arr => arr[1]),
        backgroundColor: this.colors.backgroundColor,
        borderColor: this.colors.borderColor,
        borderWidth: 1
      }];
  
      const percentagesAreaConsulta = this.calcularPorcentaje(this.dataAreaConsulta);
      this.chartLabelsAreaConsulta = percentagesAreaConsulta;
      this.chartDataAreaConsulta = [{
        data: this.dataAreaConsulta.map(arr => arr[1]),
        backgroundColor: this.colors.backgroundColor,
        borderColor: this.colors.borderColor,
        borderWidth: 1
      }];
  
      const percentagesMotivoConsulta = this.calcularPorcentaje(this.dataMotivoConsulta);
      this.chartLabelsMotivoConsulta = percentagesMotivoConsulta;
      this.chartDataMotivoConsulta = [{
        data: this.dataMotivoConsulta.map(arr => arr[1]),
        backgroundColor: this.colors.backgroundColor,
        borderColor: this.colors.borderColor,
        borderWidth: 1
      }];
    }
  }

  descargarComoImagen() {
    const chartElements = document.querySelectorAll('canvas'); 
    chartElements.forEach((canvas, index) => {
      html2canvas(canvas as HTMLElement).then(canvas => {
        const link = document.createElement('a');
        link.download = `Reporte-${this.tipo}-${this.nombre}-${this.fechaInicial}-${this.fechaFinal}-${index + 1}.png`;
        link.href = canvas.toDataURL('image/png');
        link.click(); 
      });
    });
  }
  
  descararComoPDF() {
    const chartElements = document.querySelectorAll('canvas');
    const pdf = new jsPDF('p', 'mm', 'a4');
    const altoPagina = pdf.internal.pageSize.getWidth();
    const anchoPagina = pdf.internal.pageSize.getHeight();
    let currentY = 10;
  
    chartElements.forEach((canvas, index) => {
      html2canvas(canvas as HTMLElement).then(canvas => {
        const imgData = canvas.toDataURL('image/png');
        const ancho = canvas.height * altoPagina / canvas.width; 
        if (currentY + ancho > anchoPagina) {
          pdf.addPage(); 
          currentY = 10; 
        }
        pdf.addImage(imgData, 'PNG', 10, currentY, altoPagina - 20, ancho); 
        currentY += ancho + 10; 
        if (index === chartElements.length - 1) {
          pdf.save(`Reporte-${this.tipo}-${this.nombre}-${this.fechaInicial}-${this.fechaFinal}.pdf`);
        }
      });
    });
  }

  calcularPorcentaje(data: any[]): string[] {
    const total = data.reduce((acc, curr) => acc + curr[1], 0);
    return data.map(arr => {
      const percentage = ((arr[1] / total) * 100).toFixed(2);  
      return `${arr[0]} (${percentage}%)`;  
    });
  }

  cambiarTipoGrafico(tipo: ChartType) {
    this.selectedChartType = tipo;
  }

  checkScreenSize() {
    this.sizeScreen = window.innerWidth >= 1024; 
  }
}
