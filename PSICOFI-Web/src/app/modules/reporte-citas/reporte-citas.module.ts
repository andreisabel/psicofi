import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReporteCitasPage } from './reporte-citas.page';
import { DatosReporteCitaComponent } from './components/datos-reporte-cita/datos-reporte-cita.component';
import { FormularioReporteCitaComponent } from './components/formulario-reporte-cita/formulario-reporte-cita.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/components/shared.module';


@NgModule({
  declarations: [
    ReporteCitasPage,
    DatosReporteCitaComponent,
    FormularioReporteCitaComponent,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    SharedModule
  ]
})
export class ReporteCitasModule { }
