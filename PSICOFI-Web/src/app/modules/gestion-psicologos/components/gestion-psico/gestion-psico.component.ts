import { Component, OnInit } from '@angular/core';
import { gestionPsico } from '../../services/gestion-psico.services';

declare var bootstrap: any;

@Component({
  selector: 'app-gestion-psico',
  templateUrl: './gestion-psico.component.html',
  styleUrls: ['./gestion-psico.component.css']
})
export class GestionPsicoComponent implements OnInit {
  visibleOK = false;
  public psicologos: any[] = [];
  public psicologosBackup: any[] = [];
  public inputBuscar = "";
  public isLoading = false; 
  public isLoadingEditar = false;
  psicologo = {
    "activo": 0,
    "apellidoMaterno": "Nikolaus",
    "apellidoPaterno": "Smith",
    "formatted_created_at": "2024-04-15",
    "identificador": "IAAE818652MJJEOY59",
    "nombres": "Mrs. Miracle Kessler"
  };

  constructor(private psico: gestionPsico) { }

  ngOnInit(): void {
    this.loadPsicologos();
  }

  loadPsicologos(): void {
    this.isLoading = true;
    this.psico.getPsicologos().subscribe(
      (data) => {
        this.psicologos = data;
        this.psicologosBackup = [...data];
  
        this.psicologos.sort((a: any, b: any) => {
          if (a.activo === b.activo) {
            return a.nombres.toLowerCase().localeCompare(b.nombres.toLowerCase());
          }
          return b.activo - a.activo;
        });
  
        this.isLoading = false;
      },
      (error) => {
        console.error('Error al obtener psicólogos:', error);
        this.isLoading = false;
      }
    );
  }
  public verPsico(clave: string): void {
    this.isLoading = true;
    this.psico.getPsicologoById(clave).subscribe(
      (psicologo) => {
        this.psico.psicologoViendo = psicologo;
        this.psico.verPsicoVisible = true;
        this.isLoading = false;
      },
      (error) => {
        console.error('Error al obtener psicólogo:', error);
        this.isLoading = false;
      }
    );
  }

  public editarPsicologo(clave: string): void {
    this.isLoadingEditar = true;
    this.psico.getPsicologoById(clave).subscribe(
      (psicologo) => {
        this.psico.psicologoEditar = psicologo;
        this.isLoadingEditar = false;
        this.openEditModal();
      },
      (error) => {
        console.error('Error al obtener psicólogo:', error);
        this.isLoadingEditar = false;
      }
    );
  }

  get psicologoEditar() {
    return this.psico.psicologoEditar;
  }

  public GuardarEditarPsicologo(): void {
    this.isLoading = true;
    this.psico.editarPsicologo().subscribe(
      (psicologo) => {
        this.visibleOK = true;
        setTimeout(() => {
          this.visibleOK = false;
        }, 3000);
        this.loadPsicologos(); 
        this.closeModal(); 
        this.isLoading = false;
      },
      (error) => {
        console.error('Error al editar psicólogo:', error);
        this.isLoading = false;
      }
    );
  }

  public buscarChange(): void {
    const searchQuery = this.inputBuscar.toLowerCase();
  
    this.psicologos = this.psicologosBackup.filter((psicologo: any) => {
      const nameMatches = psicologo.nombres && psicologo.nombres.toLowerCase().includes(searchQuery);
      const claveMatches = psicologo.identificador && String(psicologo.identificador).toLowerCase().includes(searchQuery);
  
      return nameMatches || claveMatches;
    });
  
    this.ordenarPsicologos();
  }
  
  private ordenarPsicologos(): void {
    this.psicologos.sort((a, b) => {
      if (a.activo === b.activo) {
        return a.nombres.localeCompare(b.nombres);
      }
      return b.activo - a.activo;
    });
  }
  

  private closeModal(): void {
    const modalElement = document.getElementById('editarpsico');
    if (modalElement) {
      const modalInstance = bootstrap.Modal.getInstance(modalElement);
      if (modalInstance) {
        modalInstance.hide();
      } else {
        const modal = new bootstrap.Modal(modalElement);
        modal.hide();
      }
    }
  }

  private openEditModal(): void {
    const modalElement = document.getElementById('editarpsico');
    if (modalElement) {
      const modalInstance = bootstrap.Modal.getInstance(modalElement);
      if (modalInstance) {
        modalInstance.show();
      } else {
        const modal = new bootstrap.Modal(modalElement);
        modal.show();
      }
    }
  }
}
