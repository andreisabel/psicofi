import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GestionPsicologosPage } from './gestion-psicologos.page';
import { GestionPsicoComponent } from './components/gestion-psico/gestion-psico.component';
import { AnadirPsicoComponent } from './components/anadir-psico/anadir-psico.component';
import { FormsModule } from '@angular/forms';
import { VerPsicologoComponent } from './components/ver-psicologo/ver-psicologo.component';
import { TablaAlumnosAtendidosComponent } from './components/tabla-alumnos-atendidos/tabla-alumnos-atendidos.component';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from 'src/app/components/shared.module';

@NgModule({
  declarations: [
    GestionPsicologosPage,
    GestionPsicoComponent,
    AnadirPsicoComponent,
    VerPsicologoComponent,
    TablaAlumnosAtendidosComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    [FormsModule],
    SharedModule
  ]
})
export class GestionPsicologosModule { }
