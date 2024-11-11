import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Cartelera } from '@interfaces/cartelera';
import { API_CARTELERA_PAGINATION, API_CARTELERA_LIST, API_CARTELERA_ADD } from '@utils/URIs';
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

  getIdByName(nombre:string):Observable<any>{
    const url = `${API_CARTELERA_LIST}/nombre/${nombre}`;
    return this.http.get<any>(url);
  }

  getByUbicacionCine(idUbicacion:number): Observable<Cartelera[]>{
    const url = `${API_CARTELERA_LIST}/id/${idUbicacion}`;
    return this.http.get<Cartelera[]>(url);
  }

  createCartelera(cartelera: Cartelera):Observable<Cartelera>{
    const url = API_CARTELERA_ADD;
    return this.http.get<Cartelera>(url);
  }
}
