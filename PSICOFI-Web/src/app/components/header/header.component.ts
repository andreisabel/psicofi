import { Component, OnInit, OnDestroy } from '@angular/core';
import { LoginService } from 'src/app/modules/login/services/login.services';
import { Router, NavigationEnd, Event } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { HistorialAlumnosService } from 'src/app/modules/historial-alumnos/services/historial-alumnos.service';
import { gestionPsico } from 'src/app/modules/gestion-psicologos/services/gestion-psico.services';

interface HeaderRoute {
  title: string;
  path: string;
  tipoUsuario: string[];
  action?: () => void;
}

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  tipoUsuario: string = '';
  clave: string = '';
  private tipoUsuarioSubscription!: Subscription;
  private routerSubscription!: Subscription;

  rutas: HeaderRoute[] = [
    { title: 'Inicio', path: '/inicio', tipoUsuario: ['Alumno', 'Psicologo', 'Administrador', 'Psicologo externo'] },
    { title: 'Agendar cita', path: '/agendar-cita', tipoUsuario: ['Alumno'] },
    { title: 'Gestión de agenda', path: '/gestion-agenda', tipoUsuario: ['Psicologo', 'Psicologo externo'] },
    { title: 'Cita urgente', path: '/cita-urgente', tipoUsuario: ['Psicologo', 'Psicologo externo'] },
    { title: 'Alumnos atendidos', path: '/historial-alumnos', tipoUsuario: ['Psicologo', 'Psicologo externo'], action: this.resetAlumnosAtendidos.bind(this)},
    { title: 'Cambiar contraseña', path: '/cambio-contrasena', tipoUsuario: ['Psicologo externo'] },
    { title: 'Gestionar psicólogos', path: '/gestion-psicologos', tipoUsuario: ['Administrador'], action: this.resetGestion.bind(this)},
    { title: 'Reportes', path: '/reportes', tipoUsuario: ['Administrador'] },
    { title: 'Cerrar sesión', path: '/cerrar-sesion', tipoUsuario: ['Alumno', 'Psicologo', 'Psicologo externo', 'Administrador'], action: this.logout.bind(this)}
  ];

  constructor(private loginService: LoginService, private router: Router, private gestionpsico: gestionPsico, private histoAlAte: HistorialAlumnosService) {}
  menuAbierto = false;
  ngOnInit(): void {
    this.tipoUsuarioSubscription = this.loginService.getTipoUsuarioObservable().subscribe(tipoUsuario => {
      this.tipoUsuario = tipoUsuario;
    });

    if (this.loginService.isLoggedIn()) {
      this.tipoUsuario = this.loginService.getTipoUsuario() || '';
      if(this.tipoUsuario != ''){
        this.clave = this.loginService.getClave();
      }
    }

    this.routerSubscription = this.router.events.pipe(
      filter((event: Event): event is NavigationEnd => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {    });
  }

  ngOnDestroy(): void {
    if (this.tipoUsuarioSubscription) {
      this.tipoUsuarioSubscription.unsubscribe();
    }
    if (this.routerSubscription) {
      this.routerSubscription.unsubscribe();
    }
  }

  get rutasFiltradas(): HeaderRoute[] {
    if (this.loginService.isLoggedIn()) {
      this.tipoUsuario = this.loginService.getTipoUsuario() || '';
      if(this.tipoUsuario != ''){
        this.clave = this.loginService.getClave();
      }
    }
    
    if (this.router.url.includes('/login')) {
      return [];
    }

    if (!this.tipoUsuario) {
      return [];
    }
    return this.rutas.filter(ruta => ruta.tipoUsuario.includes(this.tipoUsuario));
  }

  logout(): void {
    this.loginService.logout();
    this.router.navigate(['/login']); // Redirige al usuario a la página de inicio de sesión
  }

  navigate(ruta: HeaderRoute): void {
    if (ruta.action) {
      ruta.action();  // Ejecutar la acción asociada si existe
    } else {
      this.router.navigate([ruta.path]);  // Navegar a la ruta especificada si no hay acción
    }
  }

  resetAlumnosAtendidos(): void {
    this.histoAlAte.historialTablaVisible = 1;
  }

  resetGestion():void {
    this.gestionpsico.verPsicoVisible = false;
  }
}
