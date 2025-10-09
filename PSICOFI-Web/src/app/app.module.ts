import { NgModule, LOCALE_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { PaginaInicioModule } from './modules/pagina-inicio/pagina-inicio.module';
import { ReporteCitasModule } from './modules/reporte-citas/reporte-citas.module';
import { CitaUrgenteModule } from './modules/cita-urgente/cita-urgente.module';
import { FormsModule } from '@angular/forms'; 
import { ReactiveFormsModule } from '@angular/forms';
import { ReportesModule } from './modules/reportes/reportes.module';
import { LoaderComponent } from './components/loader/loader.component';
import { GestionPsicoComponent } from './modules/gestion-psicologos/components/gestion-psico/gestion-psico.component';

import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';

registerLocaleData(localeEs);


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    PaginaInicioModule,
    ReporteCitasModule,
    CitaUrgenteModule,
  ],
  providers: [{ provide: LOCALE_ID, useValue: 'es-ES' }],
  bootstrap: [AppComponent]
})
export class AppModule { }
