import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginInternoComponent } from './components/login-interno/login-interno.component';
import { LoginPage } from './login.page';
import { LoginExternoComponent } from './components/login-externo/login-externo.component';
import { FormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/components/shared.module';


@NgModule({
  declarations: [
    LoginPage,
    LoginInternoComponent,
    LoginExternoComponent,
    LoginExternoComponent
  ],
  imports: [
    CommonModule,
    FormsModule, 
    SharedModule
  ]
})
export class LoginModule { }
