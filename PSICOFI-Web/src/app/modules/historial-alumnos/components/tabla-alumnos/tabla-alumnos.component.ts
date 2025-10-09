import { Component, Input, OnInit } from '@angular/core';
import { HistorialAlumnosService } from '../../services/historial-alumnos.service';
import { debounceTime, Subject } from 'rxjs';

@Component({
  selector: 'app-tabla-alumnos',
  templateUrl: './tabla-alumnos.component.html',
  styleUrls: ['./tabla-alumnos.component.css']
})
export class TablaAlumnosComponent implements OnInit {
  public filteredPacientes: number[] = [];
  private _pacientes: number[] = [];
  public isLoading = false;
  public inputBuscar: string = '';
  private searchSubject = new Subject<string>();

  @Input()
  set pacientes(value: number[]) {
    this._pacientes = Array.isArray(value) ? value : [];
    this.filteredPacientes = [...this._pacientes];
  }

  constructor(private histo: HistorialAlumnosService) {}

  ngOnInit() {
    this.isLoading = true;
    this.histo.getPacientes().subscribe(
      data => {
        this._pacientes = Array.isArray(data) ? data : [];
        this.filteredPacientes = [...this._pacientes];
        this.isLoading = false;
      },
      error => {
        console.error('Error loading pacientes:', error);
        this.isLoading = false;
      }
    );

    this.searchSubject.pipe(debounceTime(300)).subscribe((searchTerm: string) => {
      this.buscarChange(searchTerm);
    });
  }
  /**
   * Esta funcion se encarga de buscar un alumno en la tabla
   * @param searchTerm Parametro de busqueda
   */
  public buscarChange(searchTerm: string = this.inputBuscar): void {
    const filterValue = searchTerm.toLowerCase();
    this.filteredPacientes = this._pacientes.filter(clave =>
      clave.toString().includes(filterValue)
    );
  }

  /**
   * Esta funcion se encarga de buscar un alumno en la tabla
   */
  public onSearchChange(): void {
    this.searchSubject.next(this.inputBuscar);
  }

  public verAlumnoAtendido(clave: number): void {
    this.histo.verAlumno(clave);
  }
}
