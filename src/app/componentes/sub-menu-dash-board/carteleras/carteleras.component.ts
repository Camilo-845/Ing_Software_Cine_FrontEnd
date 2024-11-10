import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Cartelera } from '@interfaces/cartelera';
import { CarteleraService } from '@services/api/cartelera.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-carteleras',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './carteleras.component.html',
  styleUrl: './carteleras.component.css',
})
export class CartelerasComponent implements OnInit {
  carteleras: Cartelera[] = [];
  page = 1;
  size = 10;
  private carteleraSubscription: any;

  constructor(private carteleraService: CarteleraService) {}

  ngOnInit(): void {
    this.loadCarteleras();
  }

  ngOnDestroy(): void {
    if (this.carteleraSubscription) {
      this.carteleraSubscription.unsubscribe();
    }
  }

  loadCarteleras(): void {
    this.carteleraSubscription = this.carteleraService
      .getPaginatedCarteleras(this.page, this.size)
      .subscribe({
        next: (data: Cartelera[]) => {
          this.carteleras = data;
        },
        error: (error) => {
          console.error('Error al cargar carteleras:', error);
        },
      });
  }

  nextPage(): void {
    this.page++;
    this.loadCarteleras();
  }

  previousPage(): void {
    if (this.page > 1) {
      this.page--;
      this.loadCarteleras();
    }
  }
}
