import { Component, OnInit } from '@angular/core';
import { CitaUrgenteService } from '../../services/cita-urgente.service';

@Component({
  selector: 'app-formulario-cita-urgente',
  templateUrl: './formulario-cita-urgente.component.html',
  styleUrls: ['./formulario-cita-urgente.component.css']
})
export class FormularioCitaUrgenteComponent implements OnInit {
  tiposIntervencion: any[] = [];
  departamentos: any[] = [];
  datosCitaLlenos: boolean = false;
  necesitaCanalizacion: boolean = false;
  visible = false;
  error = false;
  errorCita = false;
  errorIntervencion = false;
  errorNotas = false;
  errorDepaCan = false;
  errorDetalleCan = false;
  public isLoading = false;

  constructor(
    private citaUrgenteService: CitaUrgenteService,
  ) { }

  // Propiedades para los datos del formulario
  tipoIntervencion: number | null = null;
  notas: string = '';
  departamento: string = '';
  detalleCanalizacion: string = '';
  alumnoForaneo: boolean | null = null;
  datosCita: Array<any> = [];
  foraneo: boolean | null = null;

  ngOnInit(): void {
    this.necesitaCanalizacion = false;
    this.isLoading = true;
    this.citaUrgenteService.getTiposIntervencion().subscribe(
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

    this.citaUrgenteService.getDepartamentos().subscribe(
      response => {
        this.departamentos = response;
        this.isLoading = false;
      },
      error => {
        console.error('Error al obtener departamentos:', error);
        this.isLoading = false;
      }
    );

    // Suscribe al observable para mantenerse actualizado sobre el estado de los datos de la cita
    this.isLoading = true;
    this.citaUrgenteService.datosCitaLlenos$.subscribe(value => {
      this.datosCitaLlenos = value;
      this.isLoading = false;
    });
  }
  submitForm(): void {
    this.datosCita = this.citaUrgenteService.getDatosCita();
    // Crear la cita
    const citaData = {
      fecha: this.datosCita[0],
      hora: this.datosCita[1],
      claveUnica: this.datosCita[2],
      estadoCita: this.datosCita[3],
      clavePsicologo: this.datosCita[4],
      clavePsicologoExterno: this.datosCita[5],
    };

    this.isLoading = true;
    this.citaUrgenteService.crearCita(citaData).subscribe(
      (response: any) => {
        if(!this.tipoIntervencion) {
          //muestra error
          this.isLoading = false;
          this.errorIntervencion = true;
          setTimeout(() => {
            this.errorIntervencion = false;
          }, 3000);
          
        }
        else{
            if(this.necesitaCanalizacion && !this.departamento) {
              //muestra error
              this.isLoading = false;
              this.errorDepaCan = true;
              setTimeout(() => {
              this.errorDepaCan = false;
            }, 5000);
            }else{
                  const idCita = response.idCita;
                  this.isLoading = false;
                  // Crear el objeto con los datos del formulario
                  const formData = {
                    tipoIntervencion: this.tipoIntervencion,
                    departamento: this.necesitaCanalizacion ? this.departamento ? this.departamento: null : null,
                    idCita: idCita,
                    foraneo: this.foraneo
                  };
                  // Enviar los datos al servidor
                  this.isLoading = false;
                  this.citaUrgenteService.setNotaCita(formData).subscribe(
                  response => {
                    this.visible = true;
                    //esperamos unos segundos
                    setTimeout(() => {
                      this.visible = false;
                    }, 3000);
                    console.log('Datos enviados correctamente:', response);
                    this.isLoading = false;
                    window.location.reload();
                  },
                  error => {
                    this.error = true;
                    //esperamos unos segundos
                    setTimeout(() => {
                      this.error = false;
                    }, 3000);
                    this.isLoading = false;
                    console.error('Error al enviar los datos:', error);
                  }
                );
              }
        }
      },
      (error: any) => {
        this.error = true;
              //esperamos unos segundos
              setTimeout(() => {
                this.errorCita = false;
              }, 5000);
        console.error('Error crear el registro de cita urgente:', error);
      }
    );
  }
  toggleCanalizacion(): void {
    this.necesitaCanalizacion = !this.necesitaCanalizacion;
  }
}
