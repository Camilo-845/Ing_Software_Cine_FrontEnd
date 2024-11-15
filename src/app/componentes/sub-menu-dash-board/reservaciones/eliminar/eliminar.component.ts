import { Component, inject } from '@angular/core';
import { ReservacionesService } from '../../../../servicios/api/reservaciones.service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { TableComponent } from '../../../utils/table/table.component';
import { Reservacion } from '@interfaces/reservacion';

@Component({
  selector: 'app-eliminar',
  standalone: true,
  imports: [ReactiveFormsModule, TableComponent],
  templateUrl: './eliminar.component.html',
  styleUrl: './eliminar.component.css'
})
export class EliminarComponent {
  private reservacionService = inject(ReservacionesService);
  reservacionEliminada = false;
  deleteForm = new FormGroup({
    idReservacion: new FormControl('')
  });
  reservacion: Reservacion[] = [];
  headers: String[] = [
    'ID',
    'Nombre del cliente',
    'Id de la silla',
    'Id horario',
    'Precio'
  ];
  buttonMessage = "Buscar";
  showTable = false;

  onSubmit(){
    const {idReservacion} = this.deleteForm.value;
    if(this.buttonMessage == "Buscar"){
      this.find(Number(idReservacion));
      this.showTable = true;
      this.buttonMessage = "Eliminar";
    }else{
      this.reservacionService.delteReservacion(Number(idReservacion)).subscribe((res) =>{
          console.log("Reservación eliminada");
          this.reservacionEliminada = true;   
      });
      this.showTable = false;
      this.buttonMessage = "Buscar";
    }
  }

  find(id: number): void {
    this.reservacion = [];
    this.reservacionService.getById(id).subscribe((data) => {
      data.map((reservacion) => {
        console.log(reservacion)
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

  reset():void{
    this.deleteForm.reset();
    this.showTable = false;
    this.buttonMessage = "Buscar";
  }
}
