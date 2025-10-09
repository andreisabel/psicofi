import { Component, OnInit } from '@angular/core';
import { AgendarCita } from '../../services/agendar-cita.service';
import { LoginService } from 'src/app/modules/login/services/login.services';

@Component({
  selector: 'app-agenda-cita',
  templateUrl: './agendar-cita.component.html',
  styleUrls: ['./agendar-cita.component.css']
})
export class AgendarCitaComponent implements OnInit {
  claveUnica: string = '';
  nombre: string = '';
  psicologos: { id: any; nombre: string; }[] = [];
  psicologoSeleccionadoId: string = '';
  psicologoCargado: boolean = false;
  constructor(
    private agendarCitaService: AgendarCita, 
    private loginService: LoginService
  ) { }

  ngOnInit(): void {
    this.obtenerDatosAlumno();
    this.obtenerPsicologos();
  }

  obtenerDatosAlumno(): void {
    const clave = this.loginService.getClave();
    const id = parseInt(clave, 10);
    
    this.agendarCitaService.obtenerAlumno(id).subscribe(
      (data) => {
        this.claveUnica = data.claveUnica.toString();
        this.nombre = `${data.nombres} ${data.apellidoPaterno} ${data.apellidoMaterno}`;
      },
      (error) => {
        console.error('Error al obtener los datos del alumno:', error);
      }
    );
  }

  obtenerPsicologos(): void {
    this.agendarCitaService.obtenerPsicologos().subscribe(
      (data) => {
        this.psicologos = Object.values(data).map((psicologo: any) => {
          return { id: psicologo.identificador, nombre: `${psicologo.nombres} ${psicologo.apellidoPaterno} ${psicologo.apellidoMaterno}` };
        });
        if(this.psicologos[0].id != null){
          this.psicologoSeleccionadoId = this.psicologos[0].id;
          this.psicologoCargado = true;
        }
      },
      (error) => {
        console.error('Error al obtener los psicólogos:', error);
      }
    );
  }
  

  seleccionarPsicologo(event: any): void {
    if (event && event.target) {
      const selectedValue = (event.target as HTMLSelectElement).value;
      if (selectedValue) {
        this.psicologoSeleccionadoId = selectedValue;
      }
    }
  }
}
