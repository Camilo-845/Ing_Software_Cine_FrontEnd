import { Component, OnDestroy, OnInit } from '@angular/core';
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
export class CartelerasComponent implements OnInit, OnDestroy {
  carteleras: Cartelera[] = [];
  page = 1; 
  size = 10;
  total = 0; 
  private carteleraSubscription!: Subscription;

  constructor(private carteleraService: CarteleraService) {}

  ngOnInit(): void {
    this.loadCarteleras();
  }

  ngOnDestroy(): void {
    if(this.carteleraSubscription){
      this.carteleraSubscription.unsubscribe();
    }
  }

  loadCarteleras(): void {
    this.carteleraSubscription = this.carteleraService.getPaginatedCarteleras(this.page, this.size)
    .subscribe({
      next: (data: any) => {
        this.carteleras = data.data;
        this.total = Math.ceil(data.total.count/this.size);
      },
      error: error => {
        console.error('Error al cargar carteleras:', error);
      }
    });
  }

  searchCartelera(nombre:string){
    this.carteleraSubscription = this.carteleraService.getByUbicacionCine(nombre)
    .subscribe({
      next: (data:  any) => {
        this.carteleras = data.data;
        this.total = 1;
      },
      error: (error) => {
        console.error('Error al cargar la cartelera:', error);
      }
    })
  }

  nextPage(): void {
    if(this.page < this.total){
      this.page++;
      this.loadCarteleras();
    }
  }

  previousPage(): void {
    if (this.page > 1) {
      this.page--;
      this.loadCarteleras();
    }
  }
}
