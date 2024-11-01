import { Routes } from '@angular/router';
import { InicioComponent } from './componentes/inicio/inicio.component';
import { TableroComponent } from './componentes/tablero/tablero.component';
import { ErrorcitoComponent } from './componentes/errorcito/errorcito.component';
import { ClientesComponent } from './componentes/clientes/clientes.component';
import { ComidasComponent } from './componentes/comidas/comidas.component';
import { ReservacionesComponent } from './componentes/reservaciones/reservaciones.component';
import { CinesComponent } from './componentes/cines/cines.component';
import { CartelerasComponent } from './componentes/carteleras/carteleras.component';

export const routes: Routes = [
    { path: 'home', component: InicioComponent },
    { path: 'dashboard', 
      component: TableroComponent, 
      children:[
        {path: "clientes", component: ClientesComponent},
        {path: "comidas", component: ComidasComponent},
        {path: "reservaciones", component: ReservacionesComponent},
        {path: "cines", component: CinesComponent},
        {path: "carteleras", component: CartelerasComponent},
      ]},
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: '**', component: ErrorcitoComponent }
];
