import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CineService } from '../../../../servicios/api/cine.service';
import { Cine } from '../../../../interfaces/cine';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { CineDataService } from '../../../../servicios/api/shared/cinedata.service';

@Component({
  selector: 'app-editar',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './editar.component.html',
  styleUrls: ['./editar.component.css'],
})
export class EditarComponent implements OnInit {
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

  ngOnInit(): void {
    // Escuchar el idCine del servicio y cargar los datos automáticamente
    this.cineDataService.cineId$.subscribe((idCine) => {
      if (idCine !== null) {
        this.editForm.patchValue({ idCine: idCine.toString() });
        this.loadCineData(idCine);
      }
    });


    // this.cineId = Number(this.route.snapshot.paramMap.get('id'));
    // console.log('ID obtenido desde la URL:', this.cineId); // Agrega este log para verificar el ID
  
    // if (this.cineId) {
    //   this.loadCineData(this.cineId);
    // } else {
    //   console.warn('No se recibió un ID válido desde la URL');
    // }
  }
  
  // ngOnInit(): void {
  //   this.cineId = Number(this.route.snapshot.paramMap.get('id'));
  //   if (this.cineId) {
  //     this.loadCineData(this.cineId);
  //   }
  // }

  // loadCineData(id: number): void {
  //   this.cineService.getById(id).subscribe((cine) => {
  //     this.editForm.patchValue({
  //       idUbicacion: cine.idUbicacion.toString(),
  //       nombreCine: cine.nombreCine,
  //     });
  //   });
  // }

  onLoadCineData(): void {
    const idCine = this.editForm.get('idCine')?.value;
    if (idCine) {
      this.cineService.getById(Number(idCine)).subscribe(
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
    this.cineService.getById(id).subscribe(
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
    this.cineService.updateCine(cine).subscribe(
      () => {
        this.updated = true;
        this.router.navigate(['/tablero/cines/listar']);
      },
      (error) => {
        console.error('Error al actualizar el cine:', error);
      }
    );
  }
  

  // updateCine(cine: Cine): void {
  //   this.cineService.updateCine(cine).subscribe(() => {
  //     this.updated = true;
  //   });
  // }
}
