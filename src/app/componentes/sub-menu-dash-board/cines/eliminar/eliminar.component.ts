import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CineService } from '../../../../servicios/api/cine.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-eliminar-cine',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './eliminar.component.html',
  styleUrls: ['./eliminar.component.css'],
})
export class EliminarComponent {
  private cineService = inject(CineService);
  cineEliminado = false;
  cineData: any;
  deleteForm = new FormGroup({
    idCine: new FormControl(''),
  });

  onSubmit() {
    const { idCine } = this.deleteForm.value;
    this.cineService.deleteCine(Number(idCine!)).subscribe((res) => {
      console.log('Cine eliminado');
      this.cineEliminado = true;
      this.cineData = null;
    });
  }

  onLoadCineData(): void {
    const idCine = this.deleteForm.get('idCine')?.value;
    if (idCine) {
      this.cineService.getById(Number(idCine)).subscribe(
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
}
