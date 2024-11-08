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
  selector: 'app-editar',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './editar.component.html',
  styleUrl: './editar.component.css'
})
export class EditarComponent {
  private comidaService = inject(ComidaService);
  private formBuilder = inject(FormBuilder);

  createForm = this.formBuilder.group({
    id:0,
    nombre: "",
    precio : 0,
  })

  handleSubmit(): void {
    const { id , nombre, precio } = this.createForm.value as { id:number, nombre: string; precio: number };
    const comida: Comida = {
      idComida: id,
      nombreComida: nombre || "",
      precioComida: precio || 0
    };
    this.comidaService.updateComida(comida).subscribe();
    this.createForm.reset();
  }
}
