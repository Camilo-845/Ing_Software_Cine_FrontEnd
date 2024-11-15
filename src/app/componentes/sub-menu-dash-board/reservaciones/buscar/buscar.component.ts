import { Component, inject } from '@angular/core';
import { TableComponent } from '../../../utils/table/table.component';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ReservacionesService } from '../../../../servicios/api/reservaciones.service';
import { Reservacion } from '../../../../interfaces/reservacion';

@Component({
  selector: 'app-buscar',
  standalone: true,
  imports: [TableComponent, ReactiveFormsModule],
  templateUrl: './buscar.component.html',
  styleUrl: './buscar.component.css'
})
export class BuscarComponent {
  private reservacionesService = inject(ReservacionesService);
  inputForm = new FormGroup({
    idInput: new FormControl('')
  });

  headers = [
    'ID',
    'Nombre del cliente',
    'Id de la silla',
    'Id horario',
    'Precio'
  ];

  reservacion: Reservacion[] = [];

  public onSubmit(): void{
    const {idInput} = this.inputForm.value;
    if(idInput){
      this.reservacion = [];
      this.getReservacionById(Number(idInput));
    }
  }

  private getReservacionById(id: number): void{
    this.reservacion = [];
    this.reservacionesService
      .getById(id)
      .subscribe((data) => {
        data.map((reservacion) => {
          this.reservacion.push({
            idReservacion: reservacion.idReservacion,
            nombrePersona: reservacion.nombrePersona,
            idSilla: reservacion.idSilla,
            idHorario: reservacion.idHorario,
            precio: reservacion.precio
          });
        });
      });
  }
}
