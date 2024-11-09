import { Routes } from '@angular/router';
import { TableroComponent } from './componentes/tablero/tablero.component';
import { ErrorcitoComponent } from './componentes/errorcito/errorcito.component';
import { ClientesComponent } from './componentes/sub-menu-dash-board/clientes/clientes.component';
import { ComidasComponent } from './componentes/sub-menu-dash-board/comidas/comidas.component';
import { ReservacionesComponent } from './componentes/sub-menu-dash-board/reservaciones/reservaciones.component';
import { CinesComponent } from './componentes/sub-menu-dash-board/cines/cines.component';
import { CartelerasComponent } from './componentes/sub-menu-dash-board/carteleras/carteleras.component';

import { ListarComponent as ListarCliente } from './componentes/sub-menu-dash-board/clientes/listar/listar.component';
import { AgregarComponent as AgregarCliente } from './componentes/sub-menu-dash-board/clientes/agregar/agregar.component';
import { EditarComponent as EditarCliente } from './componentes/sub-menu-dash-board/clientes/editar/editar.component';
import { EliminarComponent as EliminarCliente } from './componentes/sub-menu-dash-board/clientes/eliminar/eliminar.component';
import { BuscarComponent as BuscarCliente } from './componentes/sub-menu-dash-board/clientes/buscar/buscar.component';

import { ListarComponent as ListarComida } from './componentes/sub-menu-dash-board/comidas/listar/listar.component';
import { AgregarComponent as AgregarComida } from './componentes/sub-menu-dash-board/comidas/agregar/agregar.component';
import { EditarComponent as EditarComida } from './componentes/sub-menu-dash-board/comidas/editar/editar.component';
import { EliminarComponent as EliminarComida } from './componentes/sub-menu-dash-board/comidas/eliminar/eliminar.component';

import { ListarComponent as ListarReservacion } from './componentes/sub-menu-dash-board/reservaciones/listar/listar.component';
import { BuscarComponent as BuscarReservacion } from './componentes/sub-menu-dash-board/reservaciones/buscar/buscar.component';
import { AgregarComponent as AgregarReservacion } from './componentes/sub-menu-dash-board/reservaciones/agregar/agregar.component';
import { EditarComponent as EditarReservacion } from './componentes/sub-menu-dash-board/reservaciones/editar/editar.component';
import { EliminarComponent as EliminarReservacion } from './componentes/sub-menu-dash-board/reservaciones/eliminar/eliminar.component';

import { ListarComponent as ListarCine } from './componentes/sub-menu-dash-board/cines/listar/listar.component';
import { AgregarComponent as AgregarCine } from './componentes/sub-menu-dash-board/cines/agregar/agregar.component';
import { EditarComponent as EditarCine } from './componentes/sub-menu-dash-board/cines/editar/editar.component';
import { EliminarComponent as EliminarCine } from './componentes/sub-menu-dash-board/cines/eliminar/eliminar.component';

import { BuscarComponent as BuscarCine } from './componentes/sub-menu-dash-board/cines/buscar/buscar.component';

import { ListarComponent as ListarCartelera } from './componentes/sub-menu-dash-board/carteleras/listar/listar.component';
import { BuscarComponent as BuscarCartelera } from './componentes/sub-menu-dash-board/carteleras/buscar/buscar.component';
import { AgregarComponent as AgregarCartelera } from './componentes/sub-menu-dash-board/carteleras/agregar/agregar.component';
import { EditarComponent as EditarCartelera } from './componentes/sub-menu-dash-board/carteleras/editar/editar.component';
import { EliminarComponent as EliminarCartelera } from './componentes/sub-menu-dash-board/carteleras/eliminar/eliminar.component';

export const routes: Routes = [
  { path: 'inicio', component: TableroComponent },
  {
    path: 'tablero',
    component: TableroComponent,
    children: [
      {
        path: 'clientes',
        component: ClientesComponent,
        children: [
          { path: 'listar', component: ListarCliente },
          { path: 'buscar', component: BuscarCliente },
          { path: 'agregar', component: AgregarCliente },
          { path: 'editar', component: EditarCliente },
          { path: 'eliminar', component: EliminarCliente },
        ],
      },
      {
        path: 'comidas',
        component: ComidasComponent,
        children: [
          { path: 'listar', component: ListarComida },
          { path: 'agregar', component: AgregarComida },
          { path: 'editar/:id', component: EditarComida },
          { path: 'eliminar/:id', component: EliminarComida },
        ],
      },
      {
        path: 'reservaciones',
        component: ReservacionesComponent,
        children: [
          { path: 'listar', component: ListarReservacion },
          { path: 'buscar', component: BuscarReservacion},
          { path: 'agregar', component: AgregarReservacion },
          { path: 'editar', component: EditarReservacion },
          { path: 'eliminar', component: EliminarReservacion },
        ],
      },
      {
        path: 'cines',
        component: CinesComponent,
        children: [
          { path: 'listar', component: ListarCine },
          { path: 'buscar', component: BuscarCine },
          { path: 'agregar', component: AgregarCine },
          { path: 'editar', component: EditarCine },
          { path: 'eliminar', component: EliminarCine },
        ],
      },
      {
        path: 'carteleras',
        component: CartelerasComponent,
        children: [
          { path: 'listar', component: ListarCartelera },
          { path: 'buscar', component: BuscarCartelera },
          { path: 'agregar', component: AgregarCartelera },
          { path: 'editar', component: EditarCartelera },
          { path: 'eliminar', component: EliminarCartelera },
        ],
      },
    ],
  },
  { path: '', redirectTo: 'inicio', pathMatch: 'full' },
  { path: '**', component: ErrorcitoComponent },
];
