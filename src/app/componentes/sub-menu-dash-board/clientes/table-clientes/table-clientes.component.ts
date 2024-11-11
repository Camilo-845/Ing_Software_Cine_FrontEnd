import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { Observable } from 'rxjs';
import { Cliente } from '@interfaces/cliente';
import { PaginationResponse } from '@interfaces/pagination-response';
import { Location } from '@interfaces/location';
import { DeleteModalComponent } from '@clients/delete-modal/delete-modal.component';
import { PaginationComponent } from '@clients/pagination/pagination.component';
import { AddModalComponent } from '@clients/add-modal/add-modal.component';
import { SearchModalComponent } from '@clients/search-modal/search-modal.component';
import { EditableRowComponent } from '@clients/editable-row/editable-row.component';

@Component({
  selector: 'app-table-clientes',
  standalone: true,
  imports: [
    DatePipe,
    DeleteModalComponent,
    CommonModule,
    PaginationComponent,
    AddModalComponent,
    SearchModalComponent,
    EditableRowComponent,
  ],
  templateUrl: './table-clientes.component.html',
  styleUrl: './table-clientes.component.css',
})
export class TableClientesComponent implements OnChanges {
  @Input() currentPage!: number;
  @Input() paginationResponse!: PaginationResponse | null;
  @Input() headers!: String[];
  @Output() handlePagination = new EventEmitter<number>();
  @Output() successDelete = new EventEmitter<void>();

  addModalActive: boolean = false;
  clientes!: Cliente[];
  deleteModalActive: boolean = false;
  error: string = '';
  searchModalActive: boolean = false;
  locations$!: Observable<Location[]>;
  lastPage!: number;
  success: string = '';
  selectedClientId: number = 0;
  selectedClient: Cliente | null = null;
  previouseClient: Cliente | null = null;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['paginationResponse'] && this.paginationResponse) {
      this.updateLastPage();
      this.loadClientes();
    }
  }

  handleEditClient(cliente: Cliente): void {
    if (cliente.idCliente) {
      this.selectedClientId = cliente.idCliente;
      this.previouseClient = { ...cliente };
      this.selectedClient = cliente;
    }
  }

  handleCancelEdit(): void {
    this.selectedClientId = 0;
    window.location.reload();
  }

  searchClientHandler(cliente: Cliente[]): void {
    this.clientes = cliente;
  }

  changePage(action: number | 'prev' | 'next'): void {
    if (action === 'prev' && this.currentPage > 1) {
      this.handlePagination.emit(this.currentPage - 1);
    } else if (action === 'next' && this.currentPage < this.lastPage) {
      this.handlePagination.emit(this.currentPage + 1);
    } else if (typeof action === 'number') {
      this.handlePagination.emit(action);
    }
  }

  loadClientes(): void {
    this.clientes = this.paginationResponse?.data || [];
  }

  private updateLastPage(): void {
    this.lastPage = this.paginationResponse?.totalPages || 1;
  }

  switchModal(
    type: 'delete' | 'add' | 'search',
    idCliente?: number,
    forceClose: boolean = false
  ): void {
    switch (type) {
      case 'delete':
        this.deleteModalActive = forceClose ? false : !this.deleteModalActive;
        break;
      case 'add':
        this.addModalActive = forceClose ? false : !this.addModalActive;
        break;
      case 'search':
        this.searchModalActive = forceClose ? false : !this.searchModalActive;
        break;
    }

    this.selectedClientId = idCliente ?? 0;
  }

  showError(e: any): void {
    if (e?.error?.respuesta && e?.error?.mensaje) {
      this.error = `${e.error.respuesta}. ${e.error.mensaje}`;
    } else {
      this.error = e.message || 'Ocurrió un error inesperado.';
    }

    console.error(e);

    setTimeout(() => {
      this.error = '';
    }, 2500);
  }

  showSuccess(message: string): void {
    this.success = message;
    this.successDelete.emit();
    setTimeout(() => {
      this.success = '';
    }, 2500);
  }
}
