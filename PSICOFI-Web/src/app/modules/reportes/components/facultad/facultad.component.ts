import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-facultad',
  templateUrl: './facultad.component.html',
  styleUrls: ['./facultad.component.css']
})
export class FacultadComponent {
  fechaInicial: string = '';
  fechaFinal: string = '';

  @Output() onGenerateReport = new EventEmitter<{ fechaInicial: string, fechaFinal: string }>();


}
