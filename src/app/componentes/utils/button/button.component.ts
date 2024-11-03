import { RouterModule } from '@angular/router';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './button.component.html',
  styleUrl: './button.component.css'
})
export class ButtonComponent {
  @Input({ required: true })
  ref!: String; 
  @Input({required: true})
  text!: String; 
  @Input({required: false})
  styles!: String;
  @Input({required: false})
  disabled: Boolean = true;
}
