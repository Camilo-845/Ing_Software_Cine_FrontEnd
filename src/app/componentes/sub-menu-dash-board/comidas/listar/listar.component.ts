import { Component, AfterViewInit, ChangeDetectorRef, OnInit, inject } from '@angular/core';
import { MatTableDataSource, MatTableModule} from '@angular/material/table';
import { MatInputModule} from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

import { Comida } from '../../../../interfaces/comidas';
import { ComidaService } from '../../../../servicios/api/comidas.service';

@Component({
  selector: 'app-listar',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatTableModule],
  templateUrl: './listar.component.html',
  styleUrls: ['./listar.component.css']
})
export class ListarComponent implements OnInit{
  private comidaService = inject(ComidaService);
  private page:number = 1;
  private limit:number = 10;
  private DATA: Comida[] = [];
  ngOnInit(): void {
    this.getList();
  }
  columnas: string[] = ['idComida', 'nombreComida', 'precioComida'];
  dataSource = new MatTableDataSource<Comida>(this.DATA);

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  nextPage(){
    this.page += 1;
    this.getList();
  }
  prevPage(){
    if(this.page > 1){
      this.page -= 1;
      this.getList();
    }
  }
  private getList(): void {
    this.comidaService.getAll(this.page, this.limit).subscribe((res) => {
      this.DATA = res.map((el) => ({
        nombreComida: el.nombreComida,
        idComida: el.idComida,
        precioComida: el.precioComida
      }));
      this.dataSource.data = this.DATA;
    });
  }
  
}
