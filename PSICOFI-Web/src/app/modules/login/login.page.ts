import { Component } from '@angular/core';
import { LoginService } from './services/login.services';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.css']
})
export class LoginPage {
  public getFotmVisible = this.loginService.getFormVisible();
  constructor(private loginService: LoginService) {}

  public isFormVisible(): number {
    return this.loginService.getFormVisible();
  }
}
