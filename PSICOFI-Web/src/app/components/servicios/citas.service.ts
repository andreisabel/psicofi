import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { CsrfServiceService } from 'src/app/servicios/csrfService/csrf-service.service';
import { environment } from 'environments/enviroment';

export interface Cita {
  idCita: number;
  clavePsicologo: string;
  clavePsicologoExterno?: string;
  hora: string;
  fecha: string;
  estado: string;
  claveUnica: number;
}

@Injectable({
  providedIn: 'root'
})
export class CitasService {

  constructor(private http: HttpClient, private csrfService:CsrfServiceService) {}

  obtenerCitas(id: string): Observable<Cita[]> {
    const params = new HttpParams().set('id', id);
    return this.http.get<Cita[]>(environment.api + '/cita/getDates', { params: params });
  }

  obtenerTodasLasCitas(id: string): Observable<Cita[]> {
    const params = new HttpParams().set('id', id);
    return this.http.get<Cita[]>(environment.api + '/cita/getAllDates', { params: params });
  }

  agendarCita(cita: { id: string; claveUnica: number; fecha: string; hora: string; }): Observable<any[]> {
    const csrfToken = this.csrfService.getCsrf();
    const url = environment.api + '/cita/scheduleDate';
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'X-CSRF-TOKEN': csrfToken || ''
    });
    return this.http.put<any[]>(url, cita, { headers: headers, withCredentials:true });
  }

  crearCitas(data: { id: string, fecha: string, horas: string[] }): Observable<any> {
    const csrfToken = this.csrfService.getCsrf();
    const url = environment.api + '/cita/createDates';
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'X-CSRF-TOKEN': csrfToken || ''
    });
    return this.http.post<any>(url, data, { headers: headers, withCredentials:true });
  }

  cancelarCita(data: { idCita: number, id: string }): Observable<any> {
    const csrfToken = this.csrfService.getCsrf();
    const url = environment.api + '/cita/cancelDate';
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'X-CSRF-TOKEN': csrfToken || ''
    });
    return this.http.post<any>(url, data, { headers: headers, withCredentials:true });
  }

  confirmarCita(data: { idCita: number, id: string }): Observable<any> {
    const csrfToken = this.csrfService.getCsrf();
    const url = environment.api + '/cita/confirmDate';
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'X-CSRF-TOKEN': csrfToken || ''
    });
    return this.http.post<any>(url, data, { headers:headers, withCredentials:true });
  }
}