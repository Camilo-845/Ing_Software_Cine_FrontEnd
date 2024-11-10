import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Cartelera } from '@interfaces/cartelera';
import { API_CARTELERA_PAGINATION } from '@utils/URIs';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CarteleraService {

  constructor(private http: HttpClient) {}

  getPaginatedCarteleras(page: number, size: number): Observable<Cartelera[]> {
    const url = `${API_CARTELERA_PAGINATION}?page=${page}&limit=${size}`;  // Cambié "size" por "limit"
    return this.http.get<Cartelera[]>(url);
  }
}
