import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-errorcito',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './errorcito.component.html',
  styleUrl: './errorcito.component.css'
})
export class ErrorcitoComponent {

}
