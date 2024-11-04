import { Component, Inject } from '@angular/core';
import { TableComponent } from '../../../utils/table/table.component';
import { Cliente } from '../../../../interfaces/cliente';

@Component({
  selector: 'app-listar',
  standalone: true,
  imports: [TableComponent],
  templateUrl: './listar.component.html',
  styleUrl: './listar.component.css'
})
export class ListarComponent {
  headers = ['ID', 'Nombre', 'Numero Identidad', 'Ubicacion', 'State', 'Fecha Nacimiento'];
  data: Cliente[] = [
    { id_persona: 1, nombre_persona: 'Juan', numero_identidad: '0801199900000', id_ubicacion: 1, state: true, fecha_nacimiento_persona: new Date().getFullYear() },
    { id_persona: 2, nombre_persona: 'Pedro', numero_identidad: '0801199900001', id_ubicacion: 2, state: false, fecha_nacimiento_persona: new Date().getFullYear() },
    { id_persona: 3, nombre_persona: 'Maria', numero_identidad: '0801199900002', id_ubicacion: 3, state: true, fecha_nacimiento_persona: new Date().getFullYear()},
    { id_persona: 4, nombre_persona: 'Jose', numero_identidad: '0801199900003', id_ubicacion: 4, state: false, fecha_nacimiento_persona: new Date().getFullYear()},
    { id_persona: 5, nombre_persona: 'Luis', numero_identidad: '0801199900004', id_ubicacion: 5, state: true, fecha_nacimiento_persona: new Date().getFullYear() },
  ];
}
