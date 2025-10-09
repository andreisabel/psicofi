import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { LoginService } from './modules/login/services/login.services';
import { Location } from '@angular/common'; 

export interface RouteData {
  tipoUsuario: string[];
}

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private loginService: LoginService, private router: Router, private location: Location) {}


  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const allowedUserTypes = (route.data as RouteData).tipoUsuario;
    const userType = this.loginService.getTipoUsuario();
    
    if (allowedUserTypes && allowedUserTypes.includes(userType)) {
      return true;
    } else {
      this.location.back();
      return false;
    }
  }

}
