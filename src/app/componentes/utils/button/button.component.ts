import { RouterModule } from '@angular/router';
import { Component, Input } from '@angular/core';
import { TitleCasePipe } from '@angular/common';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [RouterModule, TitleCasePipe],
  templateUrl: './button.component.html',
  styleUrl: './button.component.css'
})
export class ButtonComponent {
  @Input({ required: false })
  ref!: string; 
  @Input({required: true})
  text!: string; 
  @Input({required: false})
  styles!: string;
}
