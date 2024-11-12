import { Component, inject, OnDestroy } from '@angular/core';
import { ButtonComponent } from '../../../utils/button/button.component';
import { TableComponent } from '../../../utils/table/table.component';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CineService } from '../../../../servicios/api/cine.service';
import { Cine } from '../../../../interfaces/cine';
import { Subscription } from 'rxjs';



@Component({
  selector: 'app-buscar-cine',
  standalone: true,
  imports: [TableComponent, ReactiveFormsModule],
  templateUrl: './buscar.component.html',
  styleUrls: ['./buscar.component.css'],
})
export class BuscarComponent implements OnDestroy{
  private cineService = inject(CineService);
  private cineSubscription: Subscription | null = null;

  inputForm = new FormGroup({
    idInput: new FormControl(''),
  });
  headers = [
    'ID Cine',
    'Nombre Cine',
    'Ubicación',
  ];
  cine: Cine[] = [];

  public onSubmit(): void {
    const { idInput } = this.inputForm.value;
    if (idInput) {
      this.cine = [];
      this.getCineById(Number(idInput));
    }
  }


  private getCineById(id: number): void {
    this.cineSubscription = this.cineService.getById(id).subscribe((cine) => {
        this.cine.push({
          idCine: cine.idCine,             // Accede a la propiedad dentro del objeto 'cine'
          nombreCine: cine.nombreCine,     // Accede a la propiedad dentro del objeto 'cine'
          idUbicacion: cine.idUbicacion,   // Accede a la propiedad dentro del objeto 'cine'
        });
      });
  }

  // Implementamos ngOnDestroy para desuscribirnos
  ngOnDestroy(): void {
    if (this.cineSubscription) {
      this.cineSubscription.unsubscribe();
    }
  }
}

