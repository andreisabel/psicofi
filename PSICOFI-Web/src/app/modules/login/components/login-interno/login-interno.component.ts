import { Component } from '@angular/core';
import { LoginService } from '../../services/login.services';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-interno',
  templateUrl: './login-interno.component.html',
  styleUrls: ['./login-interno.component.css']
})
export class LoginInternoComponent {
  public cvunica: string = "";
  public contrasena: string = "";
  public errorMessage: string = "";
  public checkboxAceptado: boolean = false;
  public isLoading = false;
  public validarContrasena: boolean = false;
  public validarClave: boolean = false;

  constructor(
    private loginService: LoginService,
    private _router: Router,) { }
  public switchLogin(): void {
    this.loginService.toggleForm();
  }

  //Submit del formulario
  public onSubmit(): void {
    this.iniciarSesion();
  }

  private iniciarSesion(): void {
    if (this.cvunica.length == 6 || this.cvunica.length == 18) {
      this.validaUsuarioInterno();
    }
    else {
      this.errorMessage = "Usuario o contraseña incorrecta"; 
    }
  }

  public enforceMaxLength(event: any): void {
    const inputValue = event.target.value;
    // Filtrar cualquier caracter que no sea un número del 0 al 9
    if (!/^\d*$/.test(inputValue)) {
      event.target.value = inputValue.replace(/\D/g, '');  // Remover cualquier caracter no numérico
    }
    // Restringir la longitud del valor a 6 dígitos
    if (inputValue.length > 6) {
      // Solo mantener los primeros 6 caracteres
      event.target.value = inputValue.slice(0, 6);
      this.cvunica = event.target.value;  // Actualizar el modelo si es necesario
    }
  }

  public validaUsuarioInterno(): void {
    this.isLoading = true;
    this.loginService.loginInterno(this.cvunica, this.contrasena).subscribe((data) => {
      if (data) {
        if(data.validacion == "USUARIO-VALIDO") {
          this.loginService.setToken(data.token);
          this.loginService.setActiveUser(data.nombre);
          this.loginService.setClave(data.id);
          this.loginService.setTipoUsuario(data.rol);
          this._router.navigate(['/inicio']);
          this.isLoading = false;
          this.loginService.restartTimeout();
        }
        else if (data.validacion == "USUARIO-INVALIDO") {
          this.errorMessage = "Usuario o contraseña incorrecta";  
          this.isLoading = false;
        }
        else {
          this.errorMessage = "Ha ocurrido un error, favor inténtalo más tarde.";  
          this.isLoading = false;
        }
      }
    });
  }
}
