import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject, catchError, of } from "rxjs";
import { CsrfServiceService } from "src/app/servicios/csrfService/csrf-service.service";
import { environment } from 'environments/enviroment';
@Injectable({
    providedIn: 'root'
})
export class AgendarCita {
    constructor(private http: HttpClient, private csrfService: CsrfServiceService) { }
    private citaAgendadaSubject = new BehaviorSubject<boolean>(false);
    private citaCanceladaSubject = new Subject<void>();
    citaAgendada$ = this.citaAgendadaSubject.asObservable();

    obtenerHistorialCitas(id: number): Observable<any> {
        const csrfToken = this.csrfService.getCsrf();
        const url = environment.api + '/alumno/getRecord';
        const body = { id: id };
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'X-CSRF-TOKEN': csrfToken || ''
        });
        return this.http.post(url, body, { headers: headers, withCredentials:true });
    }

    obtenerCitasProceso(id: number): Observable<any> {
        const csrfToken = this.csrfService.getCsrf();
        const url = environment.api + '/alumno/getDate';
        const body = { id: id };
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'X-CSRF-TOKEN': csrfToken || '',
        });
        return this.http.post(url, body, { headers: headers, withCredentials:true }).pipe(
            catchError(error => {
                console.error('Error al obtener las citas en proceso:', error);
                return of(null);
            })
        );
    }

    crearCitas(id: string, fecha: string, horas: string[], token: string): Observable<any> {
        const url = environment.api + '/cita/createDates';
        const body = { id, fecha, horas };
        const headers = new HttpHeaders()
            .set('Content-Type', 'application/json')
            .set('X-CSRF-TOKEN', token);
        return this.http.post<any>(url, body, { headers: headers, withCredentials:true });
    }

    obtenerAlumno(id: number): Observable<any> {
        const csrfToken = this.csrfService.getCsrf();
        const url = environment.api + '/alumno/getAlumno';
        const body = { id: id };
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'X-CSRF-TOKEN': csrfToken || '',
        });
        return this.http.post(
            url, 
            body, 
            { headers: headers,
                withCredentials: true,
            },
        );
    }

    obtenerPsicologos(): Observable<any> {
        const csrfToken = this.csrfService.getCsrf();
        const url = environment.api + '/psicologo/getPsicologos';
        const body = { activo: 1 };
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'X-CSRF-TOKEN': csrfToken || ''
        });
        return this.http.post(url, body, { headers: headers, withCredentials: true });
    }

    cancelarCita(idCita: number, id: string): Observable<any> {
        const csrfToken = this.csrfService.getCsrf();
        const url = environment.api + '/cita/cancelDate';
        const body = { idCita, id };
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'X-CSRF-TOKEN': csrfToken || ''
        });
        return this.http.post(url, body, { headers: headers, withCredentials:true });
    }

    confirmarCita(idCita: number, id: string): Observable<any> {
        const csrfToken = this.csrfService.getCsrf();
        const url = environment.api + '/cita/confirmDate';
        const body = { idCita, id };
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'X-CSRF-TOKEN': csrfToken || ''
        });
        return this.http.post(url, body, { headers:headers, withCredentials:true });
    }
    
    setCitaAgendada(state: boolean) {
        this.citaAgendadaSubject.next(state);
    }
    
    getCitaAgendada(): Observable<boolean> {
        return this.citaAgendadaSubject.asObservable();
    }
    
    emitirCitaAgendada() {
        this.citaAgendadaSubject.next(true);
    }
    
    emitirCitaCancelada() {
        this.citaCanceladaSubject.next();
    }

    getCitaCancelada(): Observable<void> {
        return this.citaCanceladaSubject.asObservable();
    }

}

