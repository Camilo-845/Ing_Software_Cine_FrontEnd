import { Component, inject } from '@angular/core';
import { Reservacion } from '@interfaces/reservacion';
import { ReservacionesService } from '../../../../servicios/api/reservaciones.service';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-editar',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './editar.component.html',
  styleUrl: './editar.component.css'
})
export class EditarComponent {
  private reservacionService = inject(ReservacionesService);
  private formBuilder = inject(FormBuilder);
  showForm = false;
  updatedReservacion = false;
  updateMessage = "";

  findForm = this.formBuilder.group({
    idReservacion: 0
  })

  createForm = this.formBuilder.group({
    idCliente: 0,
    idSilla: 0,
    idHorario: 0,
    precio: 0
  });

  onSubmit(): void {
    const idReservacion = this.findForm.value.idReservacion;
    const { idCliente, idSilla, idHorario, precio } = this.createForm.value;
    const reservacion: Reservacion = {
      idReservacion: idReservacion!,
      nombrePersona: String(idCliente!),
      idSilla: idSilla!,
      idHorario: idHorario!,
      precio: precio!
    };
    this.createForm.reset();
    this.editarReservacion(reservacion);
  }

  find(): void {
    this.updateMessage = "";
    const id = this.findForm.value.idReservacion ?? 0;
    this.reservacionService.findReservacion(id).subscribe((data) => {
      if (data[0] == undefined || data[0] == " ") {
        this.showForm = false
        this.updateMessage = "La reservación no ha sido encontrada";
      } else {
        const rawPrice = data[0].precio;
        const formattedPrice = parseFloat(
          rawPrice.replace('$', '').replace('.', '').replace(',', '.')
        );
        this.createForm.setValue({
          idCliente: data[0].idCliente,
          idSilla: data[0].idSilla,
          idHorario: data[0].idHorario,
          precio: formattedPrice
        });
        this.showForm = true;
      }
    });
  }

  editarReservacion(reservacion: Reservacion): void {
    this.reservacionService.editReservacion(reservacion).subscribe((data) => { 
      if(data){
        this.updateMessage = "La reservación ha sido actualizada con éxito";
      }else{
        this.updateMessage = "La reservación no ha sido actualizada";
      }
    });
  }
}
