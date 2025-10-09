import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ReporteCitasService } from '../../services/reporte-citas.service';
import { Cita } from 'src/app/components/servicios/citas.service';
import { NotaCita } from 'src/app/model/nota-cita.model';

@Component({
  selector: 'app-formulario-reporte-cita',
  templateUrl: './formulario-reporte-cita.component.html',
  styleUrls: ['./formulario-reporte-cita.component.css']
})
export class FormularioReporteCitaComponent implements OnInit {
  tiposIntervencion: any[] = [];
  departamentos: any[] = [];
  datosCitaLlenos: boolean = false;
  public isLoading = false;
  necesitaCanalizacion: boolean = false;
  tipoIntervencion: number | null = null;
  notas: string = '';
  departamento: number | null = null;
  detalleCanalizacion: string = '';
  foraneo: boolean | undefined | null = null;
  atendida: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private _router:Router, 
    private reporteCitaService:ReporteCitasService,
  ) { }

    idCita = 0;
    public cita : Cita | null = null;
    public notaCita: NotaCita | null = null;
    visible = false;
    error =  false;
    errorIntervencion = false;
    errorNotas = false;
    errorDepaCan = false;
    errorDetalleCan = false;


  ngOnInit(): void {
    this.isLoading = true;
    this.reporteCitaService.getTiposIntervencion().subscribe(
      response => {
        this.tiposIntervencion = response;
        this.isLoading = false;
      },
      error => {
        console.error('Error al obtener tipos de intervención:', error);
        this.isLoading = false;
      }
    );
    this.isLoading = true;
    this.reporteCitaService.getDepartamentos().subscribe(
      response => {
        this.departamentos = response;
        this.isLoading = false;
      },
      error => {
        console.error('Error al obtener tipos de intervención:', error);
        this.isLoading = false;
      }
    );

    this.isLoading = true;
    this.route.paramMap.subscribe(params => {
      this.idCita = +params.get('idCita')!;
      if (this.idCita) {
        this.getNotaCita(this.idCita);
      }
      this.isLoading = false;
    });  
    this.isLoading = true;
    this.reporteCitaService.getEstatusCita(this.idCita).subscribe(
      (response) => {
        this.atendida = response.estadoCita === 4 ? true : false;
        this.isLoading = false;
      },
      (error) => {
        console.error('Error al obtener el estatus de la cita:', error);
        this.isLoading = false;
      }
    );
  }

  toggleCanalizacion(): void {
    this.necesitaCanalizacion = !this.necesitaCanalizacion;
  }

  getTipoDepartamentoName(idDepartamento: number | null | undefined): string {
    if (idDepartamento != null) {
      const departamento = this.departamentos.find(depa => depa.idDepartamento === idDepartamento);
      return departamento ? departamento.departamento : '';
    } else {
        return '';
    }
  }
  getTipoIntervencionName(idTipoIntervencion: number): string {
    if (idTipoIntervencion != null) {
      const tipoIntervencion = this.tiposIntervencion.find(tipo => tipo.idTipoIntervencion === idTipoIntervencion);
      return tipoIntervencion ? tipoIntervencion.tipoIntervencion : '';
    } else {
        return '';
    }
  }
  getNotaCita(idCita: number): void {
    this.isLoading = true;
    this.reporteCitaService.getNotaCita(idCita).subscribe(
      response => {
        this.notaCita = response;
        this.tipoIntervencion = this.notaCita.tipoIntervencion;
        this.foraneo = this.notaCita.foraneo;
        if(this.notaCita.departamento){
          this.necesitaCanalizacion = true;
          this.departamento = this.notaCita.departamento;
        }
        this.isLoading = false;
      },
      error => {
        console.error('Error al obtener la nota de la cita:', error);
        this.isLoading = false;
        this._router.navigate(['/historial-alumnos']);
      }
    );
  }
  submitForm(): void {
    if(!this.tipoIntervencion) {
      this.errorIntervencion = true;
      setTimeout(() => {
        this.errorIntervencion = false;
      }, 3000);
    }
    else{
        if(this.necesitaCanalizacion && !this.departamento) {
          this.errorDepaCan = true;
        setTimeout(() => {
          this.errorDepaCan = false;
        }, 5000);
        }else{
          if(!this.atendida){
            this.departamento = null;
            this.foraneo = false;
            this.necesitaCanalizacion = false;
            this.tipoIntervencion = 1;
          }
            const formData = {
              tipoIntervencion: this.tipoIntervencion,
              departamento: this.necesitaCanalizacion? this.departamento ? this.departamento: null : null,
              idCita: this.idCita,
              foraneo: this.foraneo
            };
            // Cambiar estatus de cita
            this.updateStatusCita();
            // Enviar los datos al servidor
            this.reporteCitaService.setNotaCita(this.idCita, formData).subscribe(
              response => {
                this.visible = true;
                setTimeout(() => {
                  this.visible = false;
                }, 3000);
                console.log('Datos enviados correctamente:', response);
                window.location.reload();
              },
              error => {
                this.error = true;
                setTimeout(() => {
                  this.error = false;
                }, 3000);
                console.error('Error al actualizar la nota de la cita:', error);
              }
            );
          } 
    }
  }
  updateStatusCita(): void {
    const status = this.atendida ? 4 : 5; //4: atendida, 5: no atendida
    // Prepara los datos para actualizar el estatus de la cita
    const statusData = {
      idCita: this.idCita,
      estadoCita: status
    };
    // Enviar los datos al servidor para actualizar el estatus de la cita
    this.reporteCitaService.updateEstadoCita(this.idCita,statusData).subscribe(
      response => {
        console.log('Estatus de cita actualizado correctamente:', response);
      },
      error => {
        console.error('Error al actualizar el estatus de la cita:', error);
      }
    );
  }

  obtenerEstatusCita() {
    this.reporteCitaService.getEstatusCita(this.idCita).subscribe(
      (response) => {
        this.atendida = response.estadoCita === 4 ? true : false;
        this.isLoading = false;
      },
      (error) => {
        console.error('Error al obtener el estatus de la cita:', error);
        this.isLoading = false;
      }
    );
  }
  
}
