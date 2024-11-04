import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '../../utils/button/button.component';

@Component({
  selector: 'app-clientes',
  standalone: true,
  imports: [RouterModule, CommonModule, ButtonComponent],
  templateUrl: './clientes.component.html',
  styleUrl: './clientes.component.css'
})
export class ClientesComponent {
  options: string[] = ['listar', 'buscar','agregar', 'editar', 'eliminar'];
}
