import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { ClienteService } from '../../../../servicios/api/cliente.service';
import { Cliente } from '../../../../interfaces/cliente';

@Component({
  selector: 'app-agregar',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './agregar.component.html',
  styleUrl: './agregar.component.css',
})
export class AgregarComponent {
  private clienteService = inject(ClienteService);
  private formBuilder = inject(FormBuilder);

  createForm = this.formBuilder.group({
    name: '',
    city: '',
    idDoc: '',
    bDate: '',
  });
  idNewCliente = null;

  onSubmit(): void {
    const { name, city, idDoc, bDate } = this.createForm.value;
    const client: Cliente = {
      nombreCliente: name!,
      ubicacion: city!,
      numeroIdentidad: idDoc!,
      fechaNacimiento: new Date(bDate!),
      estado: true,
    };

    this.createClient(client);
    this.createForm.reset();
  }

  createClient(client: Cliente): void {
    this.clienteService.createClient(client).subscribe((data) => {
      this.idNewCliente = data.idCliente.idPersona;
    });
  }
}
