import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarioComponent } from './calendario/calendario.component';
import { ReactiveFormsModule } from '@angular/forms';
import { LoaderComponent } from './loader/loader.component';


@NgModule({
  declarations: [CalendarioComponent, LoaderComponent
  ],
  imports: [CommonModule,
    ReactiveFormsModule],
  exports: [CalendarioComponent, LoaderComponent]
})
export class SharedModule { }
