import { Component } from '@angular/core';
import { CsrfServiceService } from 'src/app/servicios/csrfService/csrf-service.service';

@Component({
  selector: 'app-cita-urgente',
  templateUrl: './cita-urgente.page.html',
  styleUrls: ['./cita-urgente.page.css']
})
export class CitaUrgentePage {
  csrfToken: string = "";
  constructor(
    private csrfTokenService: CsrfServiceService, 
  ) {
    this.getCsrfToken();
  }

  getCsrfToken() {
    this.csrfTokenService.getCsrfToken().subscribe(data => {
      this.csrfToken = data.csrf_token;
    });
  }
}
