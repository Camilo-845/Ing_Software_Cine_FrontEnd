import {
  Component,
  EventEmitter,
  inject,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { Observable } from 'rxjs';
import { Cliente } from '@interfaces/cliente';
import { Location } from '@interfaces/location';
import { ClienteService } from '@services/api/cliente.service';
import { AsyncPipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: '[app-editable-row]',
  standalone: true,
  imports: [AsyncPipe, FormsModule, ReactiveFormsModule],
  templateUrl: './editable-row.component.html',
  styleUrl: './editable-row.component.css',
})
export class EditableRowComponent implements OnInit, OnDestroy {
  @Input() selectedClient!: Cliente | null;
  @Output() onSucess = new EventEmitter<string>();
  @Output() onError = new EventEmitter<string>();
  @Output() onCancel = new EventEmitter<void>();

  private clienteService = inject(ClienteService);
  private subscriptions: any;

  locations$!: Observable<Location[]>;

  ngOnInit(): void {
    this.loadLocations();
  }

  ngOnDestroy(): void {
    if (this.subscriptions) {
      this.subscriptions.unsubscribe();
    }
  }

  loadLocations(): void {
    this.locations$ = this.clienteService.getLocations();
  }

  startEdit(cliente: Cliente): void {
    this.selectedClient = { ...cliente };
  }

  saveEdit(): void {
    if (this.selectedClient) {
      const cliente: Cliente = this.selectedClient;

      this.editCLient(cliente);
    }
  }

  editCLient(cliente: Cliente): void {
    this.subscriptions = this.clienteService.editCliente(cliente).subscribe({
      next: (response) => {
        if (response && response.status === 200) {
          this.onSucess.emit('Cliente editado correctamente');
        }
      },
      error: (error) => {
        this.onError.emit(error);
      },

      complete: () => {
        this.onCancel.emit();
      },
    });
  }

  cancelEdit(): void {
    this.onCancel.emit();
  }
}
