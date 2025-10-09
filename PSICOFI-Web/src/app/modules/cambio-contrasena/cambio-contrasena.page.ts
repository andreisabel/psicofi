import { Component } from '@angular/core';
import { LoginService } from '../login/services/login.services';
import { CambioContra } from './services/cambioContra.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cambio-contrasena',
  templateUrl: './cambio-contrasena.page.html',
  styleUrls: ['./cambio-contrasena.page.css']
})
export class CambioContrasenaPage {
  public clave: string = "";
  public contrasenaActual: string = "";
  public contrasenaNueva: string = "";
  public confirmaContrasena: string = "";

  constructor(private loginService: LoginService, private cambioContrasena: CambioContra, private router: Router ) {
    this.clave = this.loginService.getClave();
  }

  visible = false;
  visibleError = false;

  public onSubmit() {
    if (this.checkPasswordsEquals()) {
      if (this.checkPasswordStrong()) {
        //Cambiar la contrasena
        this.cambioContrasena.cambiarContrasena(this.clave, this.contrasenaActual, this.confirmaContrasena).subscribe((data) => {
          if(data == 1)
            {
              this.contrasenaActual = "";
              this.contrasenaNueva = "";
              this.confirmaContrasena = "";
              this.visible = true;
              //esperamos unos segundos
              setTimeout(() => {
                this.visible = false;
              }, 3000);
            }
            else
            {
              this.visibleError = true;
              //
              setTimeout(() => {
                this.visibleError = false;
              }, 3000);
            }
        },
          (error) => {
            alert("Error al cambiar la contrasena");
          });
      }
      else {
        alert("La contraseña debe tener al menos 8 caracteres, una letra, un número y un caracter especial.")
      }
    }
    else {
      alert("Las contraseñas que acabas de ingresar no coinciden");
    }
  }

  public checkPasswordsEquals(): boolean {
    if (this.contrasenaNueva === this.confirmaContrasena) {
      return true;
    }
    else {
      return false;
    }
  }

  private checkPasswordStrong(): boolean {
    const strongPasswordPattern = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    return strongPasswordPattern.test(this.confirmaContrasena);
  }

  public cancelar()
  {
    this.contrasenaActual = "";
    this.contrasenaNueva = "";
    this.confirmaContrasena = "";

    //Redirigimos a la ruta de inicio
    this.router.navigate(['/inicio']);
  }
}
