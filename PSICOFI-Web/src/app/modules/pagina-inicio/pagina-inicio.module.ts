import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginaInicioPage } from './pagina-inicio.page';
import { RouterModule, Routes } from '@angular/router';
import { LoginPage } from '../login/login.page';
import { ContenidoComponent } from './components/contenido/contenido.component';
import { BannerComponent } from './components/banner/banner.component';

const routes: Routes = [
  {path: 'login', component: LoginPage}
];



@NgModule({
  declarations: [
    PaginaInicioPage,
    ContenidoComponent,
    BannerComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class PaginaInicioModule { }
