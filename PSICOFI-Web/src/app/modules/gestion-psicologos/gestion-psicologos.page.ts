import { Component, ViewChild } from '@angular/core';
import { gestionPsico } from './services/gestion-psico.services';
import { GestionPsicoComponent } from './components/gestion-psico/gestion-psico.component';

@Component({
  selector: 'app-gestion-psicologos',
  templateUrl: './gestion-psicologos.page.html',
  styleUrls: ['./gestion-psicologos.page.css']
})
export class GestionPsicologosPage{
  @ViewChild(GestionPsicoComponent) gestionPsicoComponent: GestionPsicoComponent | undefined;
  constructor (private psico: gestionPsico)
  {}

  get verPsicoVisible(): boolean
  {
    return this.psico.verPsicoVisible;
  }

  public ocultarVer()
  {
    this.psico.verPsicoVisible = false;
    
  }

  reloadPsicologos() {
    this.psico.verPsicoVisible = false;
    if (this.gestionPsicoComponent) {
      this.gestionPsicoComponent.loadPsicologos();
    }
  }
}
