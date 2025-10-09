import { Component } from '@angular/core';
import { LoginService } from '../../services/login.services';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-externo',
  templateUrl: './login-externo.component.html',
  styleUrls: ['./login-externo.component.css']
})
export class LoginExternoComponent {
  public cvunica: string = "";
  public contrasena: string = "";
  public errorMessage: string = ""
  public checkboxAceptado: boolean = false;

  public isLoading = false;

  public validarContrasena: string = "";
  public validarClave: string = "";

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
    if (this.cvunica.length == 6) {
      this.validaUsuarioInterno();
    }
    else {
      this.errorMessage = "Usuario o contraseña incorrecta";    }
  }

  //Validación simple de formato de entrada
  private validaFormulario(): boolean {
    if (this.contrasena.length < 8 || this.cvunica.length < 6) {
      this.validarContrasena = "is-invalid";
      this.validarClave = "is-invalid";
      return true;
    }
    this.validarContrasena = "";
    this.validarClave = "";
    return false;
  }


  public onInputChange(){
    if (this.validarContrasena != "") {
          this.validarContrasena = "";
          this.validarClave = "";
        }
        this.errorMessage = ""; 
  }

  //Se reestablece el invalid-input cuando se cambia
  public validaCURP(event: any): void {
  
    let value = event.target.value.toUpperCase();    
    // Expresión regular que define el formato correcto de la CURP
    const curpPattern = [
      /^[A-Z]$/,         // Primera letra del primer apellido
      /^[AEIOU]$/,       // Primera vocal interna del primer apellido
      /^[A-Z]$/,         // Primera letra del segundo apellido
      /^[A-Z]$/,         // Primera letra del primer nombre
      /^[0-9]$/,      // Año de nacimiento
      /^[0-9]$/,      // Año de nacimiento
      /^[0-9]$/,      // Mes de nacimiento
      /^[0-9]$/,      // Mes de nacimiento
      /^[0-9]$/,      // Día de nacimiento
      /^[0-9]$/,      // Día de nacimiento
      /^[HM]$/,          // Sexo
      /^[A-Z]$/,      // Estado
      /^[A-Z]$/,      // Estado
      /^[B-DF-HJ-NP-TV-Z]$/, // Primera consonante interna del primer apellido
      /^[B-DF-HJ-NP-TV-Z]$/, // Primera consonante interna del segundo apellido
      /^[B-DF-HJ-NP-TV-Z]$/, // Primera consonante interna del primer nombre
      /^[0-9A-Z]$/,      // Año de nacimiento: número o letra
      /^[0-9]$/          // Dígito verificador
    ];

    let newValue = '';
    let isValid = true;

    // Validar cada posición de la entrada
    for (let i = 0; i < value.length && i < 18; i++) {
      const currentChar = value[i];
      if (curpPattern[i].test(currentChar)) {
        newValue += currentChar;
      } else {
        isValid = false;
        break;
      }
    }
    this.cvunica = newValue;
    event.target.value = newValue;
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
    this.loginService.loginAdmin(this.cvunica, this.contrasena).subscribe((data) => {
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
