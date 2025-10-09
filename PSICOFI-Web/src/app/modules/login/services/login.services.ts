import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, Subject, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { environment } from 'environments/enviroment';
import { Router } from '@angular/router';
import { CsrfServiceService } from '../../../servicios/csrfService/csrf-service.service'

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private tipoUsuarioSubject = new Subject<string>();

  public formVisible = 1; // 1 = interno, 2 = externo
  public token: string = '';
  public claveUnica: string = '';
  public nombre: string = '';
  public rol: string = '';
  public clave: string | null = null;

  private readonly TOKEN_KEY = 'auth_token';
  private readonly USER_ACTIVE = 'active_user';
  private readonly CLAVEUNICA = 'clave_user';
  private readonly TIPOUSUARIO = 'rol';

  private readonly TIMEOUT_LIMIT = 900000; // 15 minutos
  private timeoutHandle: any;

  constructor(private http: HttpClient, private router: Router, private csrfService: CsrfServiceService) {
    this.setupEventsListenerSession();
   }

  public toggleForm() {
    this.formVisible = this.formVisible === 1 ? 2 : 1;
  }

  public getFormVisible() {
    return this.formVisible;
  }
  
  /**
   * Esta función envía una petición al servidor para verificar los datos y a través de los catch maneja los errores.
   * @param clave clave del usuario
   * @param contrasena contraseña del usuario
   * @returns Validacion de login
   */
  loginInterno(clave: string, contrasena: string): Observable<any> {
    return this.csrfService.getCsrfCookie().pipe(
      switchMap(() => {
        const csrfToken = this.csrfService.getCsrf();
        this.setToken(csrfToken ?? "token");
        if (!csrfToken) {
          return throwError('No se pudo obtener el token CSRF.');
        }
        
        return this.http.post(environment.api + '/login', 
          {
            id: clave,
            password: contrasena
          },
          {
            headers: {
              'Content-Type': 'application/json',
              'X-CSRF-TOKEN': csrfToken,
            },
            withCredentials: true,
          }
        );
      }),
      catchError((error: HttpErrorResponse) => {
        if (error.status === 500) {
          return ("Ha ocurrido un error, por favor intenta más tarde.");
        }
        return throwError(error);
      })
    );
  }

  loginAdmin(clave: string, contrasena: string): Observable<any> {
    return this.csrfService.getCsrfCookie().pipe(
      switchMap(() => {
        const csrfToken = this.csrfService.getCsrf();
        this.setToken(csrfToken ?? "token");
        if (!csrfToken) {
          return throwError('No se pudo obtener el token CSRF.');
        }
        return this.http.post(environment.api + '/loginAdmin', 
          {
            id: clave,
            password: contrasena
          },
          {
            headers: {
              'Content-Type': 'application/json',
              'X-CSRF-TOKEN': csrfToken,
            },
            withCredentials: true,
          }
        );
      }),
      catchError((error: HttpErrorResponse) => {
        if (error.status === 500) {
          return ("Ha ocurrido un error, por favor intenta más tarde.");
        }
        return throwError(error);
      })
    );
  }

  /**
   * Esta función cierra la sesión del navegador y redirige al usuario a la página de login.
   */
  logout(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.USER_ACTIVE);
    localStorage.removeItem(this.CLAVEUNICA);
    localStorage.removeItem(this.TIPOUSUARIO);
    this.tipoUsuarioSubject.next('');

    this.router.navigate(['/login']);
    this.clearTimeout();
  }

  /**
   * Esta función verifica si el usuario está autenticado.
   * @returns boolean
   */
  isAuthenticated(): boolean {
    return localStorage.getItem(this.TOKEN_KEY) !== null;
  }

  /**
   * Esta función obtiene el token del usuario.
   * @returns Token del usuario
   */
  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }
  
  /**
   * Esta función recibe un token y lo guarda en el localStorage.
   * @param token token del usuario
   */
  setToken(token: string): void {
    localStorage.setItem(this.TOKEN_KEY, token);
  }

  /**
   * Esta función obtiene la clave del usuario.
   * @returns Clave del usuario
   */
  getClave(): string {
    this.clave = localStorage.getItem(this.CLAVEUNICA);
    if (this.clave != null) {
      return this.clave;
    } else {
      return '';
    }
  }

  /**
   * Esta función obtiene el tipo de usuario.
   * @returns Tipo de usuario
   */
  getTipoUsuario(): string {
    return localStorage.getItem(this.TIPOUSUARIO) ?? '';
  }
  
  /**
   * Esta función recibe la clave única del usuario y la guarda en el localStorage.
   * @param claveUnica clave única del usuario
   */
  setClave(claveUnica: string): void {
    localStorage.setItem(this.CLAVEUNICA, claveUnica);
  }

  /**
   * Esta función recibe el tipo de usuario y lo guarda en el localStorage.
   * @param tipoUsuario Tipo de usuario
   */
  setTipoUsuario(tipoUsuario: string): void {
    localStorage.setItem(this.TIPOUSUARIO, tipoUsuario);
    this.tipoUsuarioSubject.next(tipoUsuario);
  }

  /**
   * Esta función recibe el nombre del usuario y lo guarda en el localStorage.
   * @param user Nombre del usuario
   */
  setActiveUser(user: string): void {
    localStorage.setItem(this.USER_ACTIVE, user);
  }

  /**
   * Esta función obtiene  usuario activo.
   * @returns usuario activo
   */
  getActiveUser(): string | null {
    return localStorage.getItem(this.USER_ACTIVE);
  }

  /**
   * Esta función verifica si el usuario está logueado.
   * @returns boolean
   */
  isLoggedIn(): boolean {
    return (
      localStorage.getItem(this.TOKEN_KEY) !== null &&
      localStorage.getItem(this.USER_ACTIVE) !== null
    );
  }

  /**
   * Esta función obtiene el tipo de usuario como un observable.
   * @returns Tipo de usuario observable
   */
  getTipoUsuarioObservable(): Observable<string> {
    return this.tipoUsuarioSubject.asObservable();
  }

  /**
   * Esta función reinicia el tiempo de espera.
   */
  restartTimeout(): void {
    this.clearTimeout();
    this.timeoutHandle = setTimeout(() => {
      this.logout();
    }, this.TIMEOUT_LIMIT);
  }

  /**
   * Esta función inicializa los eventos del mouse y teclado para restablecer el tiempo de espera
   */
  private setupEventsListenerSession() {
    window.addEventListener("mouseup", () => this.resetActivityTimer());
    window.addEventListener("keydown", () => this.resetActivityTimer());
    this.restartTimeout();
  }

  /**
   * Establkece el tiempo de espera después de que un evento ha sido activado, tales como:
   * - Keydown
   * - Mouseup
   */
  private resetActivityTimer() {
    this.restartTimeout();
  }

  /**
   * Limpia el timeout que está activo en caso de existir
   */
  private clearTimeout() {
    if (this.timeoutHandle) {
      clearTimeout(this.timeoutHandle);
      this.timeoutHandle = null;
    }
  }
}
