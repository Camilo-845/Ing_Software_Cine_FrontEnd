import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { Cliente } from '@interfaces/cliente';
import { CommonModule, DatePipe } from '@angular/common';
import { DeleteModalComponent } from '../delete-modal/delete-modal.component';
import { PaginationResponse } from '@interfaces/pagination-response';
import { PaginationComponent } from '../pagination/pagination.component';
import { AddModalComponent } from '../add-modal/add-modal.component';
import { SearchModalComponent } from '../search-modal/search-modal.component';

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

  clientes!: Cliente[];
  deleteModalActive: boolean = false;
  addModalActive: boolean = false;
  searchModalActive: boolean = false;
  selectedClientId: number = 0;
  lastPage!: number;
  error: string = '';
  success: string = '';

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['paginationResponse'] && this.paginationResponse) {
      this.updateLastPage();
      this.loadClientes();
    }
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

  closeModal(type: 'add' | 'delete' | 'search'): void {
    switch (type) {
      case 'delete':
        this.deleteModalActive = false;
        break;
      case 'add':
        this.addModalActive = false;
        break;
      case 'search':
        this.searchModalActive = false;
        break;
      default:
        break;
    }
  }

  openModal(type: 'delete' | 'add' | 'search', idCliente?: number): void {
    switch (type) {
      case 'delete':
        this.deleteModalActive = true;
        break;
      case 'add':
        this.addModalActive = true;
        break;
      case 'search':
        this.searchModalActive = true;
        break;
    }

    if (idCliente) {
      this.selectedClientId = idCliente;
    }
  }

  showError(e: any): void {
    if (e?.error?.respuesta && e?.error?.mensaje) {
      this.error = `${e.error.respuesta}. ${e.error.mensaje}`;
    } else {
      this.error = 'Ocurrió un error inesperado.';
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
