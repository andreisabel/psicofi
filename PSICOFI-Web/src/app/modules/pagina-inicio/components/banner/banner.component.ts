import { Component } from '@angular/core';
import { LoginService } from 'src/app/modules/login/services/login.services';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.css']
})
export class BannerComponent {
  userType: string = '';

  constructor(private loginService: LoginService) {
    this.userType = this.loginService.getTipoUsuario();
  }

  getLink(): string {
    switch (this.userType) {
      case 'Alumno':
        return '/agendar-cita';
      case 'Psicologo':
        return '/gestion-agenda';
      case 'Administrador':
        return '/gestion-psicologos';
      case 'Psicologo externo':
        return '/gestion-agenda';
      default:
        return '/login';
    }
  }

  getButtonText(): string {
    switch (this.userType) {
      case 'Alumno':
        return 'Agendar cita';
      case 'Psicologo':
        return 'Gestionar agenda';
      case 'Psicologo externo':
        return 'Gestionar agenda';
      case 'Administrador':
        return 'Gestionar psicólogos';
      default:
        return 'Iniciar sesión';
    }
  }
}
