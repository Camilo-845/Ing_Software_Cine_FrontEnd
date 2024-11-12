import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CineService } from '../../../../servicios/api/cine.service';
import { Cine } from '../../../../interfaces/cine';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { CineDataService } from '../../../../servicios/api/shared/cinedata.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-editar',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './editar.component.html',
  styleUrls: ['./editar.component.css'],
})
export class EditarComponent implements OnInit, OnDestroy {
  private cineService = inject(CineService);
  private cineDataService = inject(CineDataService);
  private formBuilder = inject(FormBuilder);
  private route = inject(ActivatedRoute);
  private router = inject(Router);        // Usamos Router para redirigir


  editForm = this.formBuilder.group({
    idCine: '',          // ID Cine que el usuario puede ingresar
    idUbicacion: '',
    nombreCine: '',
  });
  cineId: number | null = null;
  updated = false;

  // Variables para almacenar las suscripciones
  private cineDataSubscription: Subscription | null = null;
  private cineServiceSubscription: Subscription | null = null;

  ngOnInit(): void {
    // Escuchar el idCine del servicio y cargar los datos automáticamente
    this.cineDataService.cineId$.subscribe((idCine) => {
      if (idCine !== null) {
        this.editForm.patchValue({ idCine: idCine.toString() });
        this.loadCineData(idCine);
      }
    });

  }
  
  

  onLoadCineData(): void {
    const idCine = this.editForm.get('idCine')?.value;
    if (idCine) {
      this.cineServiceSubscription = this.cineService.getById(Number(idCine)).subscribe(
        (cine) => {
          // Si encontramos el cine, llenamos el formulario con sus datos
          this.editForm.patchValue({
            idUbicacion: cine.idUbicacion.toString(),
            nombreCine: cine.nombreCine,
          });
        },
        (error) => {
          console.error('Error al obtener los datos del cine:', error);
        }
      );
    } else {
      console.warn('Por favor ingrese un ID de cine válido');
    }
  }


  loadCineData(id: number): void {
    this.cineServiceSubscription = this.cineService.getById(id).subscribe(
      (cine) => {
        console.log('Datos del cine obtenidos:', cine);
        this.editForm.patchValue({
          idUbicacion: cine.idUbicacion.toString(),
          nombreCine: cine.nombreCine,
        });
      },
      (error) => {
        console.error('Error al obtener los datos del cine:', error);
      }
    );
  }
  

  onSubmit(): void {
    if (this.editForm.valid) {
      const { idCine, idUbicacion, nombreCine } = this.editForm.value;
      const cine: Cine = {
        idCine: Number(idCine),
        idUbicacion: Number(idUbicacion),
        nombreCine: nombreCine!,
      };
      this.updateCine(cine);
    }
  }

  updateCine(cine: Cine): void {
    this.cineServiceSubscription = this.cineService.updateCine(cine).subscribe(
      () => {
        this.updated = true;
        this.router.navigate(['/tablero/cines/listar']);
      },
      (error) => {
        console.error('Error al actualizar el cine:', error);
      }
    );
  }

  ngOnDestroy(): void {
    // Desuscribirse para evitar fugas de memoria
    this.cineDataSubscription?.unsubscribe();
    this.cineServiceSubscription?.unsubscribe();
  }
  
}
