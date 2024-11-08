import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';

import { ComidaService } from '../../../../servicios/api/comidas.service';
import { Comida } from '../../../../interfaces/comidas';

@Component({
  selector: 'app-eliminar',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './eliminar.component.html',
  styleUrl: './eliminar.component.css',
})
export class EliminarComponent {
  private comidaService = inject(ComidaService);
  private formBuilder = inject(FormBuilder);

  createForm = this.formBuilder.group({
    id: 0,
  });
  handleSubmit(): void {
    const { id } = this.createForm.value as { id: number };
    const comida: Comida = {
      idComida: id,
      nombreComida :"",
      precioComida: 0,
    };
    this.comidaService.deleteComida(id).subscribe();
    this.createForm.reset();
  }
}
