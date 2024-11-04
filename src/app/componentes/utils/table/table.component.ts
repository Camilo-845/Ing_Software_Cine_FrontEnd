import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [],
  templateUrl: './table.component.html',
  styleUrl: './table.component.css'
})
export class TableComponent {
    @Input() headers!: String[];
    @Input() data!: any[];
    
    getKeys(object: any): string[] {
        return Object.keys(object)
    }
}
