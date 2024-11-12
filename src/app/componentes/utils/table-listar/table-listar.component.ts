import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-table-listar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './table-listar.component.html',
  styleUrls: ['./table-listar.component.css']
})
export class TableListarComponent {
  @Input() headers!: string[];
  @Input() data!: any[];
  @Output() editEvent = new EventEmitter<number>();

  getKeys(object: any): string[] {
    return Object.keys(object);
  }

  onEdit(id: number): void {
    this.editEvent.emit(id);
  }
}
