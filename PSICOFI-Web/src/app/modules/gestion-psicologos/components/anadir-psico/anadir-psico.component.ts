import { Component } from '@angular/core';
import { gestionPsico } from '../../services/gestion-psico.services';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-anadir-psico',
  templateUrl: './anadir-psico.component.html',
  styleUrls: ['./anadir-psico.component.css']
})
export class AnadirPsicoComponent {
  visible = false;
  public claveNuevo: string = '';
  claveError: string = '';

  mensaje = ''; // Mensaje a mostrar
  mensajeTipo = ''; // 'success' o 'error'
  public nuevoPsicologo = {
    "nombres": "",
    "apellidoPaterno": "",
    "apellidoMaterno": "",
    "activo": 0,
    "idCarrera": "",
    "semestre": "",
    "correo": "",
    "contrasena": "password"
  };

  constructor(private gestionPsicoService: gestionPsico) { }
  /**
   * Esta función se encarga de agregar un psicólogo a la base de datos
   * @param form Formulario de agregar
   * @returns 
   */
  public agregarPsicologo(form: NgForm): void {
    if (form.invalid) {
      return; // No enviar si el formulario no es válido
    }

    let tipo = 0;
    if (this.claveNuevo.length == 6) {
      // Es interno
      this.claveError = '';
      tipo = 1;
      let clave = parseInt(this.claveNuevo);
      (this.nuevoPsicologo as any)['claveUnica'] = clave;
    }
    else if (this.claveNuevo.length == 18) {
      // Es externo
      this.claveError = '';
      tipo = 2;
      (this.nuevoPsicologo as any)['curp'] = this.claveNuevo;
    }
    else {
      this.claveError = 'La clave debe tener exactamente 6 o 18 caracteres';
      return;
    }

    this.nuevoPsicologo.activo = 1;
    if (tipo == 1) {
      this.registraPsicologoInterno(this.nuevoPsicologo);
    }
    else if (tipo == 2) {
      this.registraPsicologoExterno(this.nuevoPsicologo);
    }

    this.resetForm(form);
  }

  /**
   * Esta función se encarga de resetear el formulario
   * @param form form
   */
  private resetForm(form: NgForm) {
    form.resetForm();
    this.claveNuevo = '';
    this.nuevoPsicologo = {
      "nombres": "",
      "apellidoPaterno": "",
      "apellidoMaterno": "",
      "activo": 0,
      "idCarrera": "",
      "semestre": "",
      "correo": "",
      "contrasena": "password"
    };
  }

  /**
   * Esta función se encarga de registrar un psicólogo interno
   * @param psicologo Objeto de psicologo
   */
  public registraPsicologoInterno(psicologo: any): void {
    this.gestionPsicoService.agregarPsicologoInterno(psicologo).subscribe(
      (response) => {
        if (Array.isArray(response)) {
          this.mostrarMensaje(response[0], 'success');
        } else if (response.Error) {
          if (response.Error === 'Psicologo duplicado') {
            this.mostrarMensaje('El psicólogo ya está registrado', 'error');
          } else if (response.Error === 'Datos invalidos') {
            this.mostrarMensaje('Datos inválidos. Verifique los campos y vuelva a intentarlo', 'error');
          } else {
            this.mostrarMensaje('Ocurrió un error no identificado', 'error');
          }
        } else {
          this.mostrarMensaje('Respuesta inesperada del servidor', 'error');
        }
      },
      (error) => {
        this.mostrarMensaje('Ocurrió un error al intentar agregar el psicólogo', 'error');
      }
    );
}


  /**
   * Esta función se encarga de registrar un psicólogo externo
   * @param psicologo Objeto de psicologo
   */
  public registraPsicologoExterno(psicologo: any): void {
    this.gestionPsicoService.agregarPsicologoExterno(psicologo).subscribe(
      (response) => {
        if (Array.isArray(response)) {
          this.mostrarMensaje(response[0], 'success');
        } else if (response.Error) {
          if (response.Error === 'Psicologo duplicado') {
            this.mostrarMensaje('El psicólogo ya está registrado', 'error');
          } else if (response.Error === 'Datos invalidos') {
            this.mostrarMensaje('Datos inválidos. Verifique los campos y vuelva a intentarlo', 'error');
          } else {
            this.mostrarMensaje('Ocurrió un error no identificado', 'error');
          }
        } else {
          this.mostrarMensaje('Respuesta inesperada del servidor', 'error');
        }
      },
      (error) => {
        this.mostrarMensaje('Ocurrió un error al intentar agregar el psicólogo', 'error');
      }
    );
  }
  /**
   * Esta función se encarga de mostrar un mensaje en pantalla
   * @param mensaje mensaje a mostrar
   * @param tipo tipo error o success
   */
  private mostrarMensaje(mensaje: string, tipo: string) {
    this.mensaje = mensaje;
    this.mensajeTipo = tipo;
    this.visible = true;

    setTimeout(() => {
      this.visible = false;
      this.mensaje = '';
    }, 3000);
  }
}
