import { Component, Input, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarteleraService } from '@services/api/cartelera.service';
import { Cartelera } from '@interfaces/cartelera';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-eliminar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './eliminar.component.html',
  styleUrl: './eliminar.component.css'
})
export class EliminarComponent implements OnDestroy {
  @Input() cartelera!:Cartelera;
  showPopup= false;

  private deleteSubcripcion!: Subscription
  
    constructor(private carteleraService: CarteleraService) {}

  ngOnDestroy(): void {
    if(this.deleteSubcripcion){
      this.deleteSubcripcion.unsubscribe();
    }
  }

  deleteCartelera(){
    if (this.cartelera.idPeliculaCartelera !== undefined) {
      this.deleteSubcripcion = this.carteleraService.deleteCartelera(this.cartelera.idPeliculaCartelera)
      .subscribe({
        next: (res) =>{
          console.log(res);
          this.closePopup();
        },
        error: (err) =>{
          console.error(err);
        }
      })
    }
  }

  openPopup() {
    this.showPopup = true;
  }


  closePopup() {
    this.showPopup = false;
  }
}
