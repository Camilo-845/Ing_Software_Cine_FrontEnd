import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CabeceraComponent } from '../cabecera/cabecera.component';
import { SubMenuDashBoardComponent } from '../sub-menu-dash-board/sub-menu-dash-board.component';

@Component({
  selector: 'app-tablero',
  standalone: true,
  imports: [RouterModule, CommonModule, CabeceraComponent, SubMenuDashBoardComponent],
  templateUrl: './tablero.component.html',
  styleUrl: './tablero.component.css'
})
export class TableroComponent {

}
