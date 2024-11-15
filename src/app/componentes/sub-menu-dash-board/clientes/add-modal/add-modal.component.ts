import {
  Component,
  EventEmitter,
  inject,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { Observable } from 'rxjs';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ClienteService } from '@services/api/cliente.service';
import { Location } from '@interfaces/location';
import { Cliente } from '@interfaces/cliente';

@Component({
  selector: 'app-add-modal',
  standalone: true,
  imports: [AsyncPipe, ReactiveFormsModule],
  templateUrl: './add-modal.component.html',
  styleUrl: './add-modal.component.css',
})
export class AddModalComponent implements OnInit, OnDestroy {
  @Input() isActive!: boolean;
  @Output() onClose = new EventEmitter<void>();
  @Output() onError = new EventEmitter<string>();
  @Output() onSuccess = new EventEmitter<string>();
  private clienteService = inject(ClienteService);
  private formBuilder = inject(FormBuilder);
  private subscriptions: any;

  public locations$!: Observable<Location[]>;
  public addClientForm = this.formBuilder.group({
    inputName: ['', Validators.required],
    inputIdNumber: ['', Validators.required],
    inputLocation: ['', Validators.required],
    inputBirthDate: ['', Validators.required],
  });

  ngOnInit(): void {
    this.loadLocations();
  }

  ngOnDestroy(): void {
    if (this.subscriptions) {
      this.subscriptions.unsubscribe();
    }
  }

  closeModal(): void {
    this.onClose.emit();
  }

  handleFormSubmit(): void {
    if (this.addClientForm.valid) {
      const { inputName, inputIdNumber, inputLocation, inputBirthDate } =
        this.addClientForm.value;

      const cliente: Cliente = {
        nombreCliente: inputName!,
        numeroIdentidad: inputIdNumber!,
        ubicacion: inputLocation!,
        estado: true,
        fechaNacimiento: new Date(inputBirthDate!)!,
      };

      this.addClient(cliente);
    }
  }

  addClient(cliente: Cliente): void {
    this.subscriptions = this.clienteService.createClient(cliente).subscribe({
      next: (response) => {
        if (response && response.status === 201) {
          this.addClientForm.reset();
          this.closeModal();
          this.onSuccess.emit('Cliente creado correctamente');
        }
      },
      error: (error) => {
        this.closeModal();
        this.onError.emit(error);
      },
    });
  }

  onBackdropClick(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    const modalBox = document.querySelector('.modal-box');

    if (
      target.classList.contains('add-modal') &&
      modalBox &&
      !modalBox.contains(target)
    ) {
      this.closeModal();
    }
  }

  private loadLocations(): void {
    this.locations$ = this.clienteService.getLocations();
  }
}
