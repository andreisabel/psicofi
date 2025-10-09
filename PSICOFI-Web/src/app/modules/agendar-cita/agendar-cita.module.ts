import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgendarCitaPage } from './agendar-cita.page';
import { AgendarCitaComponent } from './components/agendar-cita/agendar-cita.component';
import { MisCitasComponent } from './components/mis-citas/mis-citas.component';
import { SharedModule } from 'src/app/components/shared.module';


@NgModule({
  declarations: [
    AgendarCitaPage,
    AgendarCitaComponent,
    MisCitasComponent
  ],
  imports: [
    CommonModule,
    SharedModule 
  ]
})
export class AgendarCitaModule { }
