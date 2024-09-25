import { Routes } from '@angular/router';
import { JugadoresComponent } from './components/jugadores/jugadores.component';
import { ClubesComponent } from './components/clubes/clubes.component';

export const routes: Routes = [
    {
        path: 'jugadores', component:JugadoresComponent
    },
    {
        path: 'clubes', component:ClubesComponent
    }
];
