import { Injectable } from "@angular/core";
import { LoginService } from "../../login/services/login.services";
import { Observable } from "rxjs";
import { HttpClient } from '@angular/common/http';
import { environment } from "environments/enviroment";
import { CsrfServiceService } from "src/app/servicios/csrfService/csrf-service.service";

interface AlumnoAtendido {
  claveUnica: number;
  nombres: string;
  apellidoPaterno: string;
  apellidoMaterno: string;
  area: string;
  carrera: string;
  semestre: number;
  asesor: string;
  condicionAcademica: string;
  promedioGral: number;
  creditosAprobados: number;
  creditosInscritos: number;
  sexo: string;
  edad: number;
}

@Injectable({
  providedIn: 'root'
})

export class HistorialAlumnosService {
  historialTablaVisible = 1;
  pacientes = [];
  alumnoViendo: string = '';
  records: any = [];

  public infoAlumno: AlumnoAtendido = {
    claveUnica: 0,
    nombres: '',
    apellidoPaterno: '',
    apellidoMaterno: '',
    area: '',
    carrera: '',
    semestre: 0,
    asesor: '',
    condicionAcademica: '',
    promedioGral: 0,
    creditosAprobados: 0,
    creditosInscritos: 0,
    sexo: '',
    edad: 0
  }

  constructor(private loginService: LoginService, private http: HttpClient, private csrfService: CsrfServiceService) {
    this.historialTablaVisible = 1;
  }
  public verAlumno(clave: number): void {
    this.historialTablaVisible = 0;
    this.alumnoViendo = clave.toString();
  }

  public getHistorialVisible() {
    return this.historialTablaVisible;
  }

  public getPacientes(): Observable<any> {
    const csrfToken = this.csrfService.getCsrf();
    return this.http.post(environment.api + '/psicologo/getPatients',
      {
        "id": this.loginService.getClave()
      },
      {
        headers:
        {
          'Content-Type': 'application/json',
          'X-CSRF-TOKEN': csrfToken || ''
        },
        withCredentials:true
      }
    )
  }

  public getAlumnoInfo(): Observable<AlumnoAtendido> {
    const csrfToken = this.csrfService.getCsrf();
    return this.http.post<AlumnoAtendido>(environment.api + '/alumno/getDataAlumno',
      {
        "id": this.alumnoViendo
      },
      {
        headers:
        {
          'Content-Type': 'application/json',
          'X-CSRF-TOKEN': csrfToken || ''
        },
        withCredentials:true
      }
    )
  }

  public getHistorialCitas(): Observable<any> {
    const csrfToken = this.csrfService.getCsrf();
    return this.http.post(environment.api + '/alumno/getRecord',
      {
        "id": this.alumnoViendo
      },
      {
        headers:
        {
          'Content-Type': 'application/json',
          'X-CSRF-TOKEN': csrfToken || ''
        },
        withCredentials:true
      }
    )
  }
}