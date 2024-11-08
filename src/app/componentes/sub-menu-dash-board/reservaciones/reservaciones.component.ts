import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '../../utils/button/button.component';

@Component({
  selector: 'app-reservaciones',
  standalone: true,
  imports: [RouterModule, CommonModule, ButtonComponent],
  templateUrl: './reservaciones.component.html',
  styleUrl: './reservaciones.component.css'
})
export class ReservacionesComponent {
  options: string[] = ['listar','buscar','agregar','editar','eliminar'];
}
