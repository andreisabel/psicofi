import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PsicologoService {
  private psicologoSeleccionadoSubject = new BehaviorSubject<number | null>(null);
  psicologoSeleccionado$ = this.psicologoSeleccionadoSubject.asObservable();

  seleccionarPsicologo(id: number): void {
    this.psicologoSeleccionadoSubject.next(id);
  }
}
