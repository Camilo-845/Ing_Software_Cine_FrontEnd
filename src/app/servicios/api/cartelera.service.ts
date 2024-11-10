import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Cartelera } from '@interfaces/cartelera';
import { API_CARTELERA_PAGINATION, API_CARTELERA } from '@utils/URIs';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CarteleraService {

  constructor(private http: HttpClient) {}

  getPaginatedCarteleras(page: number, size: number): Observable<Cartelera[]> {
    const url = `${API_CARTELERA_PAGINATION}?page=${page}&limit=${size}`;
    return this.http.get<Cartelera[]>(url);
  }

  getByUbicacionCine(nombre:string): Observable<Cartelera>{
    const url = `${API_CARTELERA}/${nombre}`;
    return this.http.get<Cartelera>(url);
  }
}
