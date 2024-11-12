import { Component, inject, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CineService } from '../../../../servicios/api/cine.service';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-eliminar-cine',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './eliminar.component.html',
  styleUrls: ['./eliminar.component.css'],
})
export class EliminarComponent implements OnDestroy {
  private cineService = inject(CineService);
  cineEliminado = false;
  cineData: any;
  deleteForm = new FormGroup({
    idCine: new FormControl(''),
  });

  // Variables para almacenar las suscripciones
  private deleteSubscription: Subscription | null = null;
  private getCineSubscription: Subscription | null = null;

  onSubmit() {
    const { idCine } = this.deleteForm.value;
    this.deleteSubscription = this.cineService.deleteCine(Number(idCine!)).subscribe((res) => {
      console.log('Cine eliminado');
      this.cineEliminado = true;
      this.cineData = null;
    });
  }

  onLoadCineData(): void {
    const idCine = this.deleteForm.get('idCine')?.value;
    if (idCine) {
      this.getCineSubscription = this.cineService.getById(Number(idCine)).subscribe(
        (cine) => {
          // Si se encuentran los datos del cine, los almacena en cineData
          this.cineData = cine;
        },
        (error) => {
          console.error('Error al obtener los datos del cine:', error);
        }
      );
    } else {
      console.warn('Por favor ingrese un ID de cine válido');
    }
  }

  ngOnDestroy(): void {
    // Desuscribirse para evitar fugas de memoria
    this.deleteSubscription?.unsubscribe();
    this.getCineSubscription?.unsubscribe();
  }
}
