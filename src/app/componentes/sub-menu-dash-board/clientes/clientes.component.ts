import { Component, inject, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { ClienteService } from '@services/api/cliente.service';
import { PaginationResponse } from '@interfaces/pagination-response';
import { TableClientesComponent } from './table-clientes/table-clientes.component';

@Component({
  selector: 'app-clientes',
  standalone: true,
  imports: [RouterModule, CommonModule, TableClientesComponent],
  templateUrl: './clientes.component.html',
  styleUrl: './clientes.component.css',
})
export class ClientesComponent implements OnInit {
  private clienteService = inject(ClienteService);
  private limit = 10;

  currentPage = 1;
  headers: String[] = [
    'ID',
    'Nombre',
    'Numero Identidad',
    'Ubicacion',
    'Estado',
    'Fecha Nacimiento',
  ];
  paginationResponse$!: Observable<PaginationResponse>;

  ngOnInit(): void {
    this.getClientesPagination();
  }

  handleDeleteCliente(): void {
    this.getClientesPagination();
  }

  handlePageChange(action: number): void {
    this.currentPage = action;
    this.getClientesPagination();
  }

  private getClientesPagination(): void {
    this.paginationResponse$ = this.clienteService.getPagination(
      this.currentPage,
      this.limit
    );
  }
}
