import { Component, OnDestroy, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Cartelera } from '@interfaces/cartelera';
import { CarteleraService } from '@services/api/cartelera.service';
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AgregarComponent } from './agregar/agregar.component';  // Importa el componente Agregar

@Component({
  selector: 'app-carteleras',
  standalone: true,
  imports: [RouterModule, CommonModule, FormsModule, AgregarComponent],  // Añade AgregarComponent aquí
  templateUrl: './carteleras.component.html',
  styleUrl: './carteleras.component.css',
})
export class CartelerasComponent implements OnInit, OnDestroy {
  carteleras: Cartelera[] = [];
  page = 1; 
  size = 10;
  total = 0; 
  private carteleraSubscription!: Subscription;

  showSearchInput = false;
  searchName = '';

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

  toggleSearchInput(): void {
    this.showSearchInput = !this.showSearchInput;
    this.loadCarteleras();
  }

  searchCartelera(){
    if (this.searchName.trim()) {
      this.carteleraSubscription = this.carteleraService.getIdUbicacionByName(this.searchName)
      .subscribe({
        next: (data:  any) => {
          let idCine = data[0].idUbicacion;
          this.carteleraSubscription = this.carteleraService.getCartelerasByidUbicacionCine(idCine)
          .subscribe({
            next: (data2: Cartelera[]) =>{
              this.carteleras = data2
              this.total = 1;
            },
            error: (error) => {
              console.error('Error al cargar las carteleras:', error);
            }
          })
          
        },
        error: (error) => {
          console.error('Error al encontrar el id del Cine', error);
        }
      })
    }
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
