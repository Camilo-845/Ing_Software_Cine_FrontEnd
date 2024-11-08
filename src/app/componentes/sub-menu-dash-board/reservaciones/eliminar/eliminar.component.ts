import { Component, inject } from '@angular/core';
import { ReservacionesService } from '../../../../servicios/api/reservaciones.service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-eliminar',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './eliminar.component.html',
  styleUrl: './eliminar.component.css'
})
export class EliminarComponent {
  private reservacionService = inject(ReservacionesService);
  reservacionEliminada = false;
  deleteForm = new FormGroup({
    idReservacion: new FormControl('')
  });

  onSubmit(){
    const {idReservacion} = this.deleteForm.value;
    this.reservacionService.delteReservacion(Number(idReservacion)).subscribe((res) =>{
        console.log("Reservación eliminada");
        this.reservacionEliminada = true;
    });
  }
}
