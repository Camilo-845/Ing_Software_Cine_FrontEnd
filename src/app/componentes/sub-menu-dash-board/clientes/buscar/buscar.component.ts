import { Component } from '@angular/core';
import { ButtonComponent } from '../../../utils/button/button.component';
import { TableComponent } from '../../../utils/table/table.component';
import { Cliente } from '../../../../interfaces/cliente';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-buscar',
  standalone: true,
  imports: [TableComponent],
  templateUrl: './buscar.component.html',
  styleUrl: './buscar.component.css',
})
export class BuscarComponent {
  headers = [
    'ID',
    'Nombre',
    'Numero Identidad',
    'Ubicacion',
    'State',
    'Fecha Nacimiento',
  ];
  data: Cliente[] = [
    {
      idCliente: 1,
      nombreCliente: 'Juan',
      numeroIdentidad: '0801199900000',
      ubicacion: 'Tegucigalpa',
      estado: true,
      fechaNacimiento: new Date("1999-01-08"),
    },
  ];
}
