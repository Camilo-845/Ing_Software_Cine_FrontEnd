import { Routes } from '@angular/router';
import { InicioComponent } from './componentes/inicio/inicio.component';
import { TableroComponent } from './componentes/tablero/tablero.component';
import { ErrorcitoComponent } from './componentes/errorcito/errorcito.component';
import { ClientesComponent } from './componentes/clientes/clientes.component';
import { ComidasComponent } from './componentes/comidas/comidas.component';
import { ReservacionesComponent } from './componentes/reservaciones/reservaciones.component';
import { CinesComponent } from './componentes/cines/cines.component';
import { CartelerasComponent } from './componentes/carteleras/carteleras.component';
import { OrdenesComponent } from './componentes/ordenes/ordenes.component';
import { ProductosComponent } from './componentes/productos/productos.component';
import { IngresoComponent } from './componentes/ingreso/ingreso.component';
import { RegistroComponent } from './componentes/registro/registro.component';

export const routes: Routes = [
    { path: 'home', component: InicioComponent },
    { path: 'orders', component: OrdenesComponent},
    { path: 'products', component: ProductosComponent},
    { path: 'login', component: IngresoComponent},
    { path: 'sign-up', component: RegistroComponent},
    { path: 'dashboard', component: TableroComponent, 
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
