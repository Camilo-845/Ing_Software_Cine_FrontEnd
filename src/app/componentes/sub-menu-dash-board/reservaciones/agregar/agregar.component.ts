import { Component, inject } from '@angular/core';
import { FormBuilder,ReactiveFormsModule } from '@angular/forms';
import { Reservacion } from '../../../../interfaces/reservacion';
import { ReservacionesService } from '../../../../servicios/api/reservaciones.service';

@Component({
  selector: 'app-agregar',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './agregar.component.html',
  styleUrl: './agregar.component.css'
})
export class AgregarComponent {
  private reservacionService = inject(ReservacionesService);
  private formBuilder = inject(FormBuilder);
  
  createForm = this.formBuilder.group({
    idCliente: 0,
    idSilla: 0,
    idHorario: 0,
    precio: 0
  });
  idNewReservacion = null;

  onSubmit(): void{
    const {idCliente, idSilla, idHorario, precio} = this.createForm.value;
    const reservacion: Reservacion ={
      nombrePersona: String(idCliente!),
      idSilla: idSilla!,
      idHorario: idHorario!,
      precio: precio!
    };
    this.createReservacion(reservacion);
    this.createForm.reset();
  }
  
  createReservacion(reservacion: Reservacion): void{
    this.reservacionService.createReservacion(reservacion).subscribe((data) =>{
      this.idNewReservacion = data.idReservacion;
    })
  }
}
