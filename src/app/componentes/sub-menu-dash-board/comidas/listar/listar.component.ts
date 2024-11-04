import { Component, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { MatTableDataSource, MatTableModule} from '@angular/material/table';
import { MatInputModule} from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

export interface Comida {
  id: number;
  nombre: string;
  precio: number;
}

const DATA: Comida[] = [
  { id: 1, nombre: "hamburguesa clásica", precio: 120 },
  { id: 2, nombre: "hamburguesa con queso", precio: 130 },
  { id: 3, nombre: "hamburguesa doble", precio: 150 },
  { id: 4, nombre: "hamburguesa de pollo", precio: 110 },
  { id: 5, nombre: "hamburguesa vegana", precio: 140 },
  { id: 6, nombre: "hamburguesa con bacon", precio: 160 },
  { id: 7, nombre: "hamburguesa BBQ", precio: 135 }
];

@Component({
  selector: 'app-listar',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatTableModule],
  templateUrl: './listar.component.html',
  styleUrls: ['./listar.component.css']
})
export class ListarComponent{
  columnas: string[] = ['id', 'nombre', 'precio'];
  dataSource = new MatTableDataSource<Comida>(DATA); // Declaramos dataSource sin asignar datos

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
