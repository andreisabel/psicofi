import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'environments/enviroment';
import { Cita } from 'src/app/components/servicios/citas.service';
import { Alumno } from 'src/app/model/alumno.model';
import { NotaCita } from 'src/app/model/nota-cita.model';
import { CsrfServiceService } from 'src/app/servicios/csrfService/csrf-service.service';

@Injectable({
  providedIn: 'root'
})
export class ReporteCitasService {

  constructor(private http: HttpClient, private csrfService:CsrfServiceService) { 

  } 
  getCita(idCita: number): Observable<Cita> {
    return this.http.get<Cita>(environment.api+`/getCita/${idCita}`);  
  }
  getNotaCita(idCita: number): Observable<NotaCita> {
    return this.http.get<NotaCita>(environment.api+`/getNotaCita/${idCita}`);  
  }
  getAlumno(claveUnica: number): Observable<Alumno> {
    const csrfToken = this.csrfService.getCsrf();
    return this.http.post<any>(environment.api+'/alumno/getAlumno',
      {
        "id":claveUnica
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-TOKEN': csrfToken || ''
        },
        withCredentials:true
      }
    );
    // return this.http.get<Alumno>(environment.api+`/alumno/${claveUnica}`);  
  }
  getEstatusCita(idCita: number): Observable<any> {
    return this.http.get<any>(`${environment.api}/api/estatus-cita/${idCita}`);
  }
  getReporteCita(idCita: number): Observable<any> {
    return this.http.get<any>(`${environment.api}/reporte-citas/${idCita}`);
  }
  getTiposIntervencion(): Observable<any>{
    return this.http.get<any[]>(environment.api+'/tipos-intervencion');
  }
  getDepartamentos(): Observable<any>{
    return this.http.get<any[]>(environment.api+'/departamentos')
  }
  setNotaCita(idCita: number, formData: any): Observable<any>{
    const csrfToken = this.csrfService.getCsrf();
    return this.http.put<any>(environment.api+'/api/nota-cita/'+idCita, 
      formData,
      {
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-TOKEN': csrfToken || ''
        },
        withCredentials:true
      },
      )
  }
  updateEstadoCita(idCita: number, statusData: any): Observable<any>{
    const csrfToken = this.csrfService.getCsrf();
    return this.http.put<any>(`${environment.api}/actualizar-estado-cita/${idCita}`, 
      statusData,
      {
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-TOKEN': csrfToken || ''
        },
        withCredentials: true
      }
    )
  }
}
