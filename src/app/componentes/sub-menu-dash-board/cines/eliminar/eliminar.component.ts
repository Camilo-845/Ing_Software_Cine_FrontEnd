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
  deleteForm = new FormGroup({
    idCine: new FormControl(''),
  });

  onSubmit() {
    const { idCine } = this.deleteForm.value;
    this.cineService.deleteCine(Number(idCine!)).subscribe((res) => {
      console.log('Cine eliminado');
      this.cineEliminado = true;
    });
  }
}
