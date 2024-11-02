import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cines',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './cines.component.html',
  styleUrl: './cines.component.css'
})
export class CinesComponent {

}
