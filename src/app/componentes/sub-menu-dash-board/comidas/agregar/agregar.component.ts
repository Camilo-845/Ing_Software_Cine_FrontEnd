import { Component ,inject} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';

import { ComidaService } from '../../../../servicios/api/comidas.service';
import { Comida } from '../../../../interfaces/comidas';


@Component({
  selector: 'app-agregar',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './agregar.component.html',
  styleUrl: './agregar.component.css'
})
export class AgregarComponent {
  private comidaService = inject(ComidaService);
  private formBuilder = inject(FormBuilder)

  createForm = this.formBuilder.group({
    nombre: "",
    precio : 0,
  })
  
  handleSubmit(): void {
    const { nombre, precio } = this.createForm.value as { nombre: string; precio: number };
    const comida: Comida = {
      idComida: 0,
      nombreComida: nombre || "",
      precioComida: precio || 0
    };
    this.comidaService.createComida(comida).subscribe();
    this.createForm.reset();
  }
}
