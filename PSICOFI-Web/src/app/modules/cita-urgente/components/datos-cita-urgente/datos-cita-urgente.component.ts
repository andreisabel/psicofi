import { Component } from '@angular/core';
import { CitaUrgenteService } from '../../services/cita-urgente.service';
import { LoginService } from 'src/app/modules/login/services/login.services';

@Component({
  selector: 'app-datos-cita-urgente',
  templateUrl: './datos-cita-urgente.component.html',
  styleUrls: ['./datos-cita-urgente.component.css']
})
export class DatosCitaUrgenteComponent {

  claveUnica: number | null = null;
  alumno: any = {};
  buscado: boolean = false;
  encontrado: boolean = false;
  clavePsico: number | string = "";
  cita =  {
    'fecha': '',
    'hora': '',
    'claveUnica': null,
    'estado': 4,
    'clavePsicologo': -1,
    'clavePsicologoExterno': "-1",
};

public isLoading = false;

  constructor(private citaUrgenteService: CitaUrgenteService, private loginService: LoginService) {}

  ngOnInit(): void {
    this.clavePsico = this.loginService.getClave();
    if(this.clavePsico.length > 6){
      this.cita.clavePsicologoExterno= this.clavePsico.toString();
    }else{
      this.cita.clavePsicologo= parseInt(this.clavePsico);
    }
  }

  buscarAlumno() {
    this.isLoading = true;
    this.buscado = true;
    if(this.claveUnica) {
      this.citaUrgenteService.obtenerAlumno(this.claveUnica).subscribe(
        response => {
          if(response.claveUnica){
            this.alumno = response;
            this.encontrado = true;
            this.isLoading = false;
          }
          else{
            this.encontrado = false;
            this.claveUnica = null;
            this.citaUrgenteService.setDatosCitaLlenos(false);
            console.error('No se encontró el alumno con la clave unica introducida.');
            this.isLoading = false;
          }
          this.isLoading = false;
        },
        error => {
          this.encontrado = false;
          this.claveUnica = null;
          console.error('Error al intentar obtener alumno:', error);
          this.isLoading = false;
        }
      );
    } else {
      this.claveUnica = null;
      this.alumno = {};
      this.encontrado = false;
      this.isLoading = false;
    }
    
  }

  actualizarCita() {
    if (this.cita.fecha && this.cita.hora && this.cita.claveUnica) {
      this.citaUrgenteService.setDatosCita(this.cita.fecha,this.cita.hora,this.cita.claveUnica,this.cita.clavePsicologo,this.cita.clavePsicologoExterno);
      this.citaUrgenteService.setDatosCitaLlenos(true);
    } else {
      this.citaUrgenteService.setDatosCitaLlenos(false); 
    }
  }
}
