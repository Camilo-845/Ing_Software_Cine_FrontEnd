import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ComidaService } from '../../../../servicios/api/comidas.service';
import { Comida } from '../../../../interfaces/comidas';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-editar',
  standalone: true,
  imports: [ReactiveFormsModule,MatProgressSpinnerModule,RouterModule],
  templateUrl: './editar.component.html',
  styleUrls: ['./editar.component.css'] // Cambiado a "styleUrls"
})
export class EditarComponent implements OnInit{
  private comidaService = inject(ComidaService);
  private formBuilder = inject(FormBuilder);
  private route = inject(ActivatedRoute);
  loading = true;
  render = false;
  comidaId:string = '';

  // Definimos el tipo para los controles del formulario
  createForm: FormGroup = this.formBuilder.group({
    id: 0,
    nombre: "",
    precio: 0,
  });

  ngOnInit () {
    this.route.paramMap.subscribe((params) => {
      this.comidaId = params.get('id')!;
      if (this.comidaId) {
        // Hacer una petición HTTP con el ID de la comida
        this.comidaService.getComidaById(parseInt(this.comidaId)).subscribe((comida: Comida) => {
          console.log('Datos de la comida:', comida);
          this.createForm.setValue({ id: comida.idComida, nombre: comida.nombreComida, precio: parseInt((""+comida.precioComida).replace(/[$,]/g, ""), 10)});
          this.loading = false
        });
      }
    });

    this.comidaService.getComidaById

  }

  handleSubmit(): void {
    const { id, nombre, precio } = this.createForm.value as {
      id: number;
      nombre: string;
      precio: number;
    };

    const comida: Comida = {
      idComida: id,
      nombreComida: nombre || "",
      precioComida: precio || 0,
    };

    this.comidaService.updateComida(comida).subscribe({
      next: () => {
        console.log("Comida actualizada correctamente.");
        this.createForm.reset();
      },
      error: (error) => {
        console.error("Error al actualizar la comida:", error);
      },
    });
  }

  show(): void {
    this.createForm.setValue({ id: 3, nombre: "creacdoa asdfasldkfj", precio: 1232 });
    this.render = true;
  }
}
