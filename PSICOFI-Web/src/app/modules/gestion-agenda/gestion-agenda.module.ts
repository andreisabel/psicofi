import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/components/shared.module';
import { GestionAgendaPage } from './gestion-agenda.page';


@NgModule({
  declarations: [
    GestionAgendaPage,

  ],
  imports: [
    CommonModule,
    SharedModule 
  ]
})
export class GestionAgendaModule { }
