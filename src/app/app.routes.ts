import { Routes } from '@angular/router';
import { JugadoresComponent } from './components/jugadores/jugadores.component';
import { ClubesComponent } from './components/clubes/clubes.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './Security/auth.guard';
import { EquiposComponent } from './components/equipos/equipos.component';
import { EntrenadoresComponent } from './components/entrenadores/entrenadores.component';
import { CampeonatosComponent } from './components/campeonatos/campeonatos.component';
import { EscenarioComponent } from './components/escenario/escenario.component';
import { PartidosComponent } from './components/partidos/partidos.component';
import { HabilitacionesComponent } from './components/habilitaciones/habilitaciones.component';
import { JugadorasComponent } from './components/jugadoras/jugadoras.component';
import { EquiposDamasComponent } from './components/equipos-damas/equipos-damas.component';

export const routes: Routes = [
    {
        path: '', redirectTo: 'jugadores', pathMatch:'full'
    },
    {
        path: 'jugadores', component:JugadoresComponent, canActivate : [AuthGuard]
    },
    {
        path: 'jugadoras', component:JugadorasComponent, canActivate: [AuthGuard]
    },
    {
        path: 'clubes', component:ClubesComponent, canActivate : [AuthGuard]
    },
    {
        path: 'equipos', component:EquiposComponent, canActivate : [AuthGuard]
    },
    {
        path: 'equiposDamas', component:EquiposDamasComponent, canActivate : [AuthGuard]
    },
    {
        path: 'entrenadores', component: EntrenadoresComponent, canActivate : [AuthGuard]
    },
    {
        path: 'campeonatos', component: CampeonatosComponent, canActivate : [AuthGuard]
    },
    {
        path: 'escenarios', component: EscenarioComponent, canActivate : [AuthGuard]
    },
    {
        path: 'login' , component: LoginComponent
    },
    {
        path: 'partidos', component : PartidosComponent, canActivate : [AuthGuard]
    },
    {
        path: 'habilitaciones', component: HabilitacionesComponent, canActivate : [AuthGuard]
    }

];
