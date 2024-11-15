import { Component, inject } from '@angular/core';
import { TableComponent } from '../../../utils/table/table.component';
import { Reservacion } from '../../../../interfaces/reservacion';
import { ReservacionesService } from '../../../../servicios/api/reservaciones.service';

@Component({
  selector: 'app-listar',
  standalone: true,
  imports: [TableComponent],
  templateUrl: './listar.component.html',
  styleUrl: './listar.component.css'
})
export class ListarComponent {
  private reservacionesService = inject(ReservacionesService);
  private page = 1;
  private limit = 10;

  reservaciones: Reservacion[] = [];
  headers: String[] = [
    'ID',
    'Nombre del cliente',
    'Id de la silla',
    'Id horario',
    'Precio'
  ];

  ngOnInit(): void {
    this.getClientesPagination();
  }

  onBack(): void {
    if (this.page > 1) {
      this.page--;
      this.getClientesPagination();
    }
  }

  onAdd(): void {
    this.page++;
    this.getClientesPagination();
  }

  private getClientesPagination(): void {
    this.reservaciones = [];
    this.reservacionesService
      .getPagination(this.page, this.limit)
      .subscribe((data) => {
        data.map((reservacion) => {
          this.reservaciones.push({
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
