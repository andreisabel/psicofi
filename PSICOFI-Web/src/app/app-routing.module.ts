import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginModule } from './modules/login/login.module';
import { GestionPsicologosModule } from './modules/gestion-psicologos/gestion-psicologos.module';
import { AgendarCitaModule } from './modules/agendar-cita/agendar-cita.module';
import { GestionAgendaModule } from './modules/gestion-agenda/gestion-agenda.module';
import { LoginPage } from './modules/login/login.page';
import { GestionPsicologosPage } from './modules/gestion-psicologos/gestion-psicologos.page';
import { AgendarCitaPage } from './modules/agendar-cita/agendar-cita.page';
import { PaginaInicioPage } from './modules/pagina-inicio/pagina-inicio.page';
import { CambioContrasenaPage } from './modules/cambio-contrasena/cambio-contrasena.page';
import { CambioContrasenaModule } from './modules/cambio-contrasena/cambio-contrasena.module';
import { GestionAgendaPage } from './modules/gestion-agenda/gestion-agenda.page';
import { HistorialAlumnosPage } from './modules/historial-alumnos/historial-alumnos.page';
import { HistorialAlumnosModule } from './modules/historial-alumnos/historial-alumnos.module';
import { ReporteCitasPage } from './modules/reporte-citas/reporte-citas.page';
import { CitaUrgentePage } from './modules/cita-urgente/cita-urgente.page';
import { ReportesPage } from './modules/reportes/reportes.page';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  {path: 'login', component: LoginPage},
  {path: 'gestion-psicologos', component: GestionPsicologosPage, canActivate: [AuthGuard], data: { tipoUsuario: ['Administrador'] } },
  { path: 'gestion-agenda', component: GestionAgendaPage, canActivate: [AuthGuard], data: { tipoUsuario: ['Psicologo', 'Psicologo externo'] } },
  {path: 'inicio', component: PaginaInicioPage},
  {path: '', component: PaginaInicioPage},
  {path: 'agendar-cita', component: AgendarCitaPage, canActivate: [AuthGuard], data: { tipoUsuario: ['Alumno'] } },
  {path: 'cambio-contrasena', component: CambioContrasenaPage, canActivate: [AuthGuard], data: { tipoUsuario: ['Psicologo externo'] } },
  {path: 'historial-alumnos', component: HistorialAlumnosPage, canActivate: [AuthGuard], data: { tipoUsuario: ['Psicologo', 'Psicologo externo'] } },
  {path: 'reporte-citas/:idCita', component: ReporteCitasPage, canActivate: [AuthGuard], data: { tipoUsuario: ['Psicologo', 'Psicologo externo'] } },
  {path: 'cita-urgente', component: CitaUrgentePage, canActivate: [AuthGuard], data: { tipoUsuario: ['Psicologo', 'Psicologo externo'] } },
  {path: 'reportes', component: ReportesPage, canActivate: [AuthGuard], data: { tipoUsuario: ['Administrador'] } },
  { path: '**', redirectTo: '/inicio' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
