import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'environments/enviroment';

@Injectable({
  providedIn: 'root'
})
export class CsrfServiceService {

  constructor(private http: HttpClient) { }

  getCsrfToken() {
    return this.http.get<any>(environment.api+'/csrf-token');
  }

  getCsrfCookie() {
    return this.http.get(environment.api+'/sanctum/csrf-cookie', { withCredentials: true});
  }

  private getCookie(name: string): string | null {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) {
        const cookieValue = parts.pop()?.split(';')?.[0];
        
        return cookieValue ? cookieValue : null;
    }
    return null;
  }

  getCsrf(): string | null {
    return this.getCookie('XSRF-TOKEN');
  }
  
}
