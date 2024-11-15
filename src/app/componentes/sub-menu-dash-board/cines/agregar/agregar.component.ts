import { Component, inject, OnDestroy } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { CineService } from '../../../../servicios/api/cine.service';
import { Cine } from '../../../../interfaces/cine';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-agregar',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './agregar.component.html',
  styleUrls: ['./agregar.component.css'],
})
export class AgregarComponent implements OnDestroy{
  private cineService = inject(CineService);
  private formBuilder = inject(FormBuilder);

  createForm = this.formBuilder.group({
    idUbicacion: '',
    nombreCine: '',
  });
  idNewCine = null;
  private cineSubscription: Subscription | null = null;


  onSubmit(): void {
    const { idUbicacion, nombreCine } = this.createForm.value;
    const cine: Cine = {
      idCine: 0, // Este será asignado automáticamente por el backend
      idUbicacion: Number(idUbicacion), // Convertir idUbicacion a número
      nombreCine: nombreCine!,
    };
    this.createCine(cine);
    this.createForm.reset();
  }

  createCine(cine: Cine): void {
    this.cineService.createCine(cine).subscribe((data) => {
      this.idNewCine = data.idCine;
    });
  }

  ngOnDestroy(): void {
    this.cineSubscription?.unsubscribe();
  }
}