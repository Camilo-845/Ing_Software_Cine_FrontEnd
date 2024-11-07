import { Component, inject, Inject, OnInit } from '@angular/core';
import { TableComponent } from '../../../utils/table/table.component';
import { Cliente } from '../../../../interfaces/cliente';
import { ClienteService } from '../../../../servicios/api/cliente.service';

@Component({
  selector: 'app-listar',
  standalone: true,
  imports: [TableComponent],
  templateUrl: './listar.component.html',
  styleUrl: './listar.component.css',
})
export class ListarComponent implements OnInit {
  private clienteService = inject(ClienteService);
  private page = 1;
  private limit = 10;

  clientes: Cliente[] = [];
  headers: String[] = [
    'ID',
    'Nombre',
    'Numero Identidad',
    'Ubicacion',
    'State',
    'Fecha Nacimiento',
  ];

  ngOnInit(): void {
    this.getClientesPagination();
  }

  private getClientesPagination(): void {
    this.clienteService
      .getPagination(this.page, this.limit)
      .subscribe((data) => {
        data.map((cliente) => {
          this.clientes.push({
            idCliente: cliente.idCliente,
            nombreCliente: cliente.nombreCliente,
            numeroIdentidad: cliente.numeroIdentidad,
            ubicacion: cliente.ubicacion,
            estado: cliente.estado,
            fechaNacimiento: cliente.fechaNacimiento,
          });
        });
      });
  }
}
