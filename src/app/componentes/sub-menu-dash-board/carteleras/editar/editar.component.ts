import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Cartelera } from '@interfaces/cartelera';
import { Cine } from '@interfaces/cine';
import { Pelicula } from '@interfaces/pelicula';
import { CarteleraService } from '@services/api/cartelera.service';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-editar',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './editar.component.html',
  styleUrl: './editar.component.css'
})
export class EditarComponent implements OnInit, OnDestroy{
  @Input() cartelera!: Cartelera;
  showPopup: boolean = false;
  idPeliculaCartelera!:number;
  idCine!:number;
  idPelicula!:number;
  dateInicio!:Date;
  dateFin!:Date;
  cines: Cine[] = [];
  peliculas: Pelicula[] = [];

  private editarSubscription!: Subscription;

  constructor(private carteleraService: CarteleraService) {}

  ngOnInit(): void {
    if (this.cartelera) {
      this.idCine = this.cartelera.idCine;
      this.idPelicula = this.cartelera.idPelicula;
      this.dateInicio = this.cartelera.fechaInicio;
      this.dateFin = this.cartelera.fechaFinal;
    }
    this.loadCines();
    this.loadPeliculas();
  }

  ngOnDestroy(): void {
    if(this.editarSubscription){
      this.editarSubscription.unsubscribe();
    }
  }

  loadCines(): void{
    this.editarSubscription = this.carteleraService.getCines()
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
    this.editarSubscription = this.carteleraService.getPeliculas()
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
    this.cartelera = {
      idPeliculaCartelera: this.cartelera.idPeliculaCartelera,
      idCine: this.idCine,
      idPelicula: this.idPelicula,
      fechaInicio: this.dateInicio,
      fechaFinal: this.dateFin,
    };
    this.editarSubscription = this.carteleraService.updateCartelera(this.cartelera)
    .subscribe({
      next: (data: any)=>{
        console.log(data)
        alert('La cartelera con Id: ' +data.respuBase.idPeliculaCartelera+ " se ha actualizado con exito "); 
        this.closePopup();
      },
      error: (err) =>{
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

