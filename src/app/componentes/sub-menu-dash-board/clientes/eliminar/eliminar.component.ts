import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ClienteService } from '../../../../servicios/api/cliente.service';

@Component({
  selector: 'app-eliminar',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './eliminar.component.html',
  styleUrl: './eliminar.component.css',
})
export class EliminarComponent {
  private clienteService = inject(ClienteService);
  clienteElimiado = false;
  deleteForm = new FormGroup({
    idCliente: new FormControl(''),
  });

  onSubmit() {
    const { idCliente } = this.deleteForm.value;
    this.clienteService.deleteCliente(Number(idCliente!)).subscribe((res) => {
      console.log('Cliente eliminado');
      this.clienteElimiado = true;
    });
  }
}
