import { catchError, of } from 'rxjs';
import { ClienteService } from './../../../../servicios/api/cliente.service';
import {
  Component,
  EventEmitter,
  inject,
  Input,
  OnDestroy,
  Output,
} from '@angular/core';

@Component({
  selector: 'app-delete-modal',
  standalone: true,
  imports: [],
  templateUrl: './delete-modal.component.html',
  styleUrl: './delete-modal.component.css',
})
export class DeleteModalComponent implements OnDestroy {
  @Input() clientId!: number;
  @Input() isActive!: boolean;
  @Output() onClose = new EventEmitter<void>();
  @Output() onError = new EventEmitter<string>();
  @Output() onSuccess = new EventEmitter<string>();

  private clienteService = inject(ClienteService);
  private subscription: any;

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  deleteClient(): void {
    if (!this.clientId) return;

    this.subscription = this.clienteService
      .deleteCliente(this.clientId)
      .subscribe({
        next: (response) => {
          if (response && response.status === 200) {
            this.onSuccess.emit('Cliente eliminado correctamente');
          } else {
            this.onError.emit('Error al eliminar el cliente');
          }

          this.closeModal();
        },
        error: (error) => {
          this.onError.emit(error);
          this.closeModal();
        },
      });
  }

  closeModal(): void {
    this.onClose.emit();
  }

  onBackdropClick(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    const modalBox = document.querySelector('.modal-box');

    if (
      target.classList.contains('delete-modal') &&
      modalBox &&
      !modalBox.contains(target)
    ) {
      this.closeModal();
    }
  }
}
