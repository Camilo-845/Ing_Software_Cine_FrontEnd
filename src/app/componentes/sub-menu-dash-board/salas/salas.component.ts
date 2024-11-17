import { Component, OnDestroy, OnInit } from '@angular/core';
import { GetSalasService } from '../../../servicios/api/get-salas.service';

@Component({
  selector: 'app-salas',
  standalone: true,
  imports: [],
  templateUrl: './salas.component.html',
  styleUrl: './salas.component.css',
})
export class SalasComponent implements OnInit, OnDestroy {
  constructor(private getSalasService: GetSalasService) {}

  ngOnInit(): void {
    this.getSalas();
  }

  ngOnDestroy(): void {}

  public getSalas() {
    this.getSalasService.getSalas().subscribe((res) => {
      console.log(res);
    });
  }
}
