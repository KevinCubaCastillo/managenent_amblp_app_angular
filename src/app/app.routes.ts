import { Routes } from '@angular/router';
import { JugadoresComponent } from './components/jugadores/jugadores.component';
import { ClubesComponent } from './components/clubes/clubes.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './Security/auth.guard';
import { EquiposComponent } from './components/equipos/equipos.component';
import { EntrenadoresComponent } from './components/entrenadores/entrenadores.component';
import { CampeonatosComponent } from './components/campeonatos/campeonatos.component';
import { EscenarioComponent } from './components/escenario/escenario.component';

export const routes: Routes = [
    {
        path: '', redirectTo: 'jugadores', pathMatch:'full'
    },
    {
        path: 'jugadores', component:JugadoresComponent
    },
    {
        path: 'clubes', component:ClubesComponent
    },
    {
        path: 'equipos', component:EquiposComponent
    },
    {
        path: 'entrenadores', component: EntrenadoresComponent
    },
    {
        path: 'campeonatos', component: CampeonatosComponent
    },
    {
        path: 'escenarios', component: EscenarioComponent
    }

];
