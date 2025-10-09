import { Routes } from '@angular/router';
import { PaginaInicioPage } from './modules/pagina-inicio/pagina-inicio.page';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full',
    }, 
    {   path: 'inicio', 
        component: PaginaInicioPage }
];
