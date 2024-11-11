import { Component, inject, Inject, OnInit } from '@angular/core';
import { TableComponent } from '../../../utils/table/table.component';
import { Cine } from '../../../../interfaces/cine';
import { CineService } from '../../../../servicios/api/cine.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
  // Importamos Router


@Component({
  selector: 'app-listar',
  standalone: true,
  imports: [TableComponent, CommonModule],
  templateUrl: './listar.component.html',
  styleUrl: './listar.component.css',
})

export class ListarComponent implements OnInit {
  private cineService = inject(CineService);
  private router = inject(Router);  // Inyectamos Router
  private page = 1;
  private limit = 10;
  cines: Cine[] = [];
  headers: string[] = ['ID', 'Nombre Cine', 'ID Ubicación'];

  ngOnInit(): void {
    this.getCinesPagination();
  }

  onBack(): void {
    if (this.page > 1) {
      this.page--;
      this.getCinesPagination();
    }
  }

  onEdit(idCine: number | undefined): void {
    if (idCine !== undefined) {
      this.router.navigate([`/tablero/cines/editar/${idCine}`]);
    } else {
      console.warn('ID de cine no válido');
    }
  }
  

  onAdd(): void {
    this.page++;
    this.getCinesPagination();
  }

  private getCinesPagination(): void {
    this.cines = [];
    this.cineService
      .getPagination(this.page, this.limit)
      .subscribe((data) => {
        data.map((cine) => {
          this.cines.push({
            idCine: cine.idCine,
            nombreCine: cine.nombreCine,
            idUbicacion: cine.idUbicacion,
          });
        });
      });
  }
}

