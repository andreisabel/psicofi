import { Injectable } from "@angular/core";
import { HttpClient} from "@angular/common/http";
import { Observable } from "rxjs";
import { LoginService } from "../../login/services/login.services";
import { environment } from "environments/enviroment";
import { CsrfServiceService } from "src/app/servicios/csrfService/csrf-service.service";

@Injectable({
  providedIn: 'root'
})

export class gestionPsico {

  fetchedPsico = [];

  constructor(private http: HttpClient, private loginService: LoginService, private csrfService: CsrfServiceService
  ) {
    if(loginService.isAuthenticated()){
      this.fetchPsicologos().subscribe((data) => {
        this.fetchedPsico = data;
      });
    }
  }

  public verPsicoVisible: boolean = false;

  psicologoViendo = {
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

  psicologoEditar = {
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


  fetchPsicologos(): Observable<any> {
    const csrfToken = this.csrfService.getCsrf();
      return this.http.post(environment.api+'/psicologo/getPsicologos', {}, 
      {
          headers: {
            'Content-Type': 'application/json',
            'X-CSRF-TOKEN': csrfToken || ''
          },
          withCredentials:true,
      });
  }

  getPsicologos(): Observable<any> {
    return this.fetchPsicologos();
  }

  getPsicologoById(clave: string): Observable<any> {
    const csrfToken = this.csrfService.getCsrf();

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

    this.psicologoEditar = {
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

    return this.http.post(environment.api + '/psicologo/searchPsicologo',
      {
        "id": clave
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-TOKEN': csrfToken || ''
        },
        withCredentials: true
      }
    );
  }

  agregarPsicologoInterno(psicologoNuevo: any): Observable<any> {
    const csrfToken = this.csrfService.getCsrf();

    return this.http.post(environment.api + '/psicologo/registerPsicologo',
      {
        "nombres": psicologoNuevo.nombres,
        "apellidoPaterno": psicologoNuevo.apellidoPaterno,
        "apellidoMaterno": psicologoNuevo.apellidoMaterno,
        "activo": "1",
        "idCarrera": psicologoNuevo.idCarrera,
        "semestre": psicologoNuevo.semestre,
        "correo": psicologoNuevo.correo,
        "contrasena": "contrasena123!",
        "claveUnica": psicologoNuevo.claveUnica
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-TOKEN': csrfToken || ''
        },
        withCredentials:true
      }
    );
  }

  agregarPsicologoExterno(psicologoNuevo: any): Observable<any> {
    const csrfToken = this.csrfService.getCsrf();

    return this.http.post(environment.api + "/psicologo/registerPsicologo", {
      "CURP": psicologoNuevo.curp,
      "nombres": psicologoNuevo.nombres,
      "apellidoPaterno": psicologoNuevo.apellidoPaterno,
      "apellidoMaterno": psicologoNuevo.apellidoMaterno,
      "Carrera": "Psicologia",
      "semestre": psicologoNuevo.semestre,
      "activo": 1,
      "correo": psicologoNuevo.correo,
      "contrasena": psicologoNuevo.curp,
    },
      {
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-TOKEN': csrfToken || ''
        },
        withCredentials:true
      }
    );

  }


  editarPsicologo() {
    const csrfToken = this.csrfService.getCsrf();

    const body: any = {
      nombres: this.psicologoEditar.nombres,
      apellidoPaterno: this.psicologoEditar.apellidoPaterno,
      apellidoMaterno: this.psicologoEditar.apellidoMaterno,
      activo: this.psicologoEditar.activo
    };
  
    if (this.psicologoEditar.claveUnica) {
      body.clave = this.psicologoEditar.claveUnica;
    } else {
      body.curp = this.psicologoEditar.curp;
    }
  
    return this.http.put(environment.api + '/psicologo/updatePsicologo', body, {
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-TOKEN': csrfToken || ''
      },
      withCredentials: true
    });
  }
  
  filtrarPsicologos() {
    this.fetchedPsico = this.fetchedPsico;
  }

  fetchAlumnosPorPsicologo(id: string): Observable<any> {
    const csrfToken = this.csrfService.getCsrf();

    return this.http.post(environment.api + '/psicologo/getPatients',
      {
        "id": id
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-TOKEN': csrfToken || ''
        },
        withCredentials: true,
      }
    );
  }
}