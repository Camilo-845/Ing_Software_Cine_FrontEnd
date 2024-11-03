import { Component } from '@angular/core';
import { ButtonComponent } from '../../../utils/button/button.component';
import { TableComponent } from '../../../utils/table/table.component';
import { Cliente } from '../../../../interfaces/cliente';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-buscar',
  standalone: true,
  imports: [ TableComponent],
  templateUrl: './buscar.component.html',
  styleUrl: './buscar.component.css'
})
export class BuscarComponent {
  headers = ['ID', 'Nombre', 'Numero Identidad', 'Ubicacion', 'State', 'Fecha Nacimiento'];
  data: Cliente[] = [
    { id_persona: 1, nombre_persona: 'Juan', numero_identidad: '0801199900000', id_ubicacion: 1, state: true, fecha_nacimiento_persona: new Date().getFullYear() },
  ];
}
