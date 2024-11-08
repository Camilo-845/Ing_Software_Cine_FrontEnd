import { Component, inject } from '@angular/core';
import { ButtonComponent } from '../../../utils/button/button.component';
import { TableComponent } from '../../../utils/table/table.component';
import { Cliente } from '../../../../interfaces/cliente';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ClienteService } from '../../../../servicios/api/cliente.service';

@Component({
  selector: 'app-buscar',
  standalone: true,
  imports: [TableComponent, ReactiveFormsModule],
  templateUrl: './buscar.component.html',
  styleUrl: './buscar.component.css',
})
export class BuscarComponent {
  private clienteService = inject(ClienteService);
  inputForm = new FormGroup({
    idInput: new FormControl(''),
  });

  headers = [
    'ID',
    'Nombre',
    'Numero Identidad',
    'Ubicacion',
    'State',
    'Fecha Nacimiento',
  ];

  cliente: Cliente[] = [];

  public onSubmit(): void {
    const { idInput } = this.inputForm.value;
    if (idInput) {
      this.cliente = [];
      this.getClienteById(Number(idInput));
    }
  }

  private getClienteById(id: number): void {
    this.clienteService.getById(id).subscribe((cliente) => {
      if (cliente.length === 0) {
        alert('No se encontro el cliente con el id: ' + id);
      }

      cliente.map((c) => {
        this.cliente.push({
          idCliente: c.idCliente,
          nombreCliente: c.nombreCliente,
          numeroIdentidad: c.numeroIdentidad,
          ubicacion: c.ubicacion,
          estado: c.estado,
          fechaNacimiento: c.fechaNacimiento,
        });
      });
    });
  }
}
