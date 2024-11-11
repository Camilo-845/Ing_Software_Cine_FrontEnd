import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Cine } from '@interfaces/cine';
import { Pelicula } from '@interfaces/pelicula';
import { Subscription } from 'rxjs';
import { CarteleraService } from '@services/api/cartelera.service';
import { Cartelera } from '@interfaces/cartelera';

@Component({
  selector: 'app-agregar',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './agregar.component.html',
  styleUrl: './agregar.component.css'
})
export class AgregarComponent implements OnInit, OnDestroy{
  showPopup: boolean = false;
  idCine!:number;
  idPelicula!:number;
  dateInicio!:Date;
  dateFin!:Date;
  cines: Cine[] = [];
  peliculas: Pelicula[] = [];

  private agregarSubscription!: Subscription;

  constructor(private carteleraService: CarteleraService) {}

  ngOnInit(): void {
    this.loadCines();
    this.loadPeliculas();
  }

  ngOnDestroy(): void {
    if(this.agregarSubscription){
      this.agregarSubscription.unsubscribe();
    }
  }

  loadCines(): void{
    this.agregarSubscription = this.carteleraService.getCines()
    .subscribe({
      next: (data: Cine[]) =>{
        this.cines = data
      },
      error: (err) =>{
        console.error('Error al cargar cines:', err);
      }
    })
  }

  loadPeliculas():void{
    this.agregarSubscription = this.carteleraService.getPeliculas()
    .subscribe({
      next: (data: Pelicula[]) =>{
        this.peliculas = data;
      },
      error : (err) =>{
        console.error('Error al cargar peliculas:', err);
      }
    })
  }

  submitForm() {
    const cartelera: Cartelera = {
      idCine: this.idCine,
      idPelicula: this.idPelicula,
      fechaInicio: this.dateInicio,
      fechaFinal: this.dateFin,
    };
    this.agregarSubscription = this.carteleraService.createCartelera(cartelera)
    .subscribe({
      next: (data: Cartelera)=>{
        this.agregarSubscription = this.carteleraService.getCartelerasByidCine(this.idCine)
        .subscribe({
          next: (data2: Cartelera[]) =>{
            console.log(data2)
            alert('La cartelera con id:' +data.idPeliculaCartelera+ " se ha creado con exito "+ 
              "en el cine "+data2[0].nombreUbicacion); 
            this.closePopup();
          }
        })
      },
      error: (err) =>{
        if (err.status === 409) {
          alert('La cartelera ya existe para esta combinación de cine y película. Por favor, verifica los datos.');
        } else {
          alert('Por favor complete todos los campos correctamente.');
        }
        console.error('Error al crear la cartelera:', err);
      }
    })
  }

  openPopup() {
    this.showPopup = true;
  }


  closePopup() {
    this.showPopup = false;
  }

  
}
