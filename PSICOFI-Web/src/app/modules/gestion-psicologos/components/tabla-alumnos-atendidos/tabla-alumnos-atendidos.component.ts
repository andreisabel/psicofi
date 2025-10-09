import { Component, Input, OnInit } from '@angular/core';
import { gestionPsico } from '../../services/gestion-psico.services';

@Component({
  selector: 'app-tabla-alumnos-atendidos',
  templateUrl: './tabla-alumnos-atendidos.component.html',
  styleUrls: ['./tabla-alumnos-atendidos.component.css']
})
export class TablaAlumnosAtendidosComponent implements OnInit {
  @Input() cvePsicologo: number = 0;

  public alumnos: any[] = [];  
  public alumnosFiltrados: number[] = []; 
  public inputBuscar: string = ''; 

  constructor(private gestionPsico: gestionPsico) {
  }

  ngOnInit(): void {
    this.fetchAlumnos();
  }


  fetchAlumnos(): void {
    this.gestionPsico.fetchAlumnosPorPsicologo(this.gestionPsico.psicologoViendo.claveUnica ?? this.gestionPsico.psicologoViendo.curp).subscribe({
      next: (data) => {
        this.alumnos = Array.isArray(data) ? data : [];
        this.alumnosFiltrados = [...this.alumnos]; 
      },
      error: (error) => {
        console.error('Error fetching alumnos:', error);
      }
    });
  }
  
  public buscarAlumno(): void {
    const searchQuery = this.inputBuscar.toLowerCase();  
  
    if (this.alumnos.length > 0) {
      this.alumnosFiltrados = this.alumnos.filter(alumno => {
        const clave = alumno.toString(); 
        return clave.toLowerCase().includes(searchQuery); 
      });
    } else {
      console.error('No se han encontrado alumnos.');
    }
  }
  
}
