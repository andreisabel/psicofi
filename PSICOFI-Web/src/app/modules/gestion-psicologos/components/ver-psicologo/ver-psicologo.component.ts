import { Component, OnInit } from '@angular/core';
import { gestionPsico } from '../../services/gestion-psico.services';

@Component({
  selector: 'app-ver-psicologo',
  templateUrl: './ver-psicologo.component.html',
  styleUrls: ['./ver-psicologo.component.css']
})
export class VerPsicologoComponent implements OnInit {

  public psicologoViendo = {
    "claveUnica": "",
    "nombres": "",
    "apellidoPaterno": "",
    "apellidoMaterno": "",
    "semestre": 0,
    "correo": "",
    "activo": 0,
    "carrera": "",
    "curp": ""
  }

  constructor(private psico: gestionPsico) { }

  ngOnInit() {
    this.psicologoVer();
  }

  public ocultarVer() {
    this.psico.verPsicoVisible = false;
  }

  private psicologoVer() {
    this.psicologoViendo = {
      "claveUnica": "",
      "nombres": "",
      "apellidoPaterno": "",
      "apellidoMaterno": "",
      "semestre": 0,
      "correo": "",
      "activo": 0,
      "carrera": "",
      "curp": ""
    }
    this.psicologoViendo = this.psico.psicologoViendo;
  }
}
