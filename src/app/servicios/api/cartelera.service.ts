import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Cartelera } from '@interfaces/cartelera';
import { Cine } from '@interfaces/cine';
import { Pelicula } from '@interfaces/pelicula';
import { API_CARTELERA_PAGINATION, API_CARTELERA_LIST, API_CARTELERA_ADD, API_CINE_LIST_FOR_CARTELERA, API_PELICULA_LIST_FOR_CARTELERA, API_CARTELERA_UPDATE, API_CARTELERA_DELETE } from '@utils/URIs';
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

  getIdUbicacionByName(nombre:string):Observable<any>{
    const url = `${API_CARTELERA_LIST}/nombreUbicacion/${nombre}`;
    return this.http.get<any>(url);
  }

  getCartelerasByidUbicacionCine(idUbicacion:number): Observable<Cartelera[]>{
    const url = `${API_CARTELERA_LIST}/idUbicacion/${idUbicacion}`;
    return this.http.get<Cartelera[]>(url);
  }

  getCartelerasByidCine(idCine:number): Observable<Cartelera[]>{
    const url = `${API_CARTELERA_LIST}/idCine/${idCine}`;
    return this.http.get<Cartelera[]>(url);
  }

  getCines():Observable<Cine[]>{
    return this.http.get<Cine[]>(API_CINE_LIST_FOR_CARTELERA);
  }

  getPeliculas():Observable<Pelicula[]>{
    return this.http.get<Pelicula[]>(API_PELICULA_LIST_FOR_CARTELERA);
  }

  createCartelera(cartelera: Cartelera):Observable<Cartelera>{
    return this.http.post<Cartelera>(API_CARTELERA_ADD,cartelera);
  }

  updateCartelera(cartelera: Cartelera):Observable<any>{
    return this.http.put<Cartelera>(API_CARTELERA_UPDATE,cartelera);
  }

  deleteCartelera(idCartelera: number):Observable<any>{
    const url = `${API_CARTELERA_DELETE}/${idCartelera}`;
    return this.http.delete<Cartelera>(url);
  }
}
