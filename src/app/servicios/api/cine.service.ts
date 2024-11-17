import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import {
  API_CINE,
  API_CINE_ADD,
  API_CINE_DELETE,
  API_CINE_GET,
  API_CINE_LIST,
  API_CINE_PAGINATION,
  API_CINE_UPDATE,
} from '../../utils/URIs';
import { Observable } from 'rxjs';
import { Cine } from '../../interfaces/cine';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root',
})
export class CineService {
  private httpClient = inject(HttpClient);

  // Obtener todos los cines
  public getAll(): Observable<Cine[]> {
    return this.httpClient.get<Cine[]>(API_CINE_LIST);
  }

  // Obtener cines con paginación
  public getPagination(page: number, size: number): Observable<Cine[]> {
    return this.httpClient.get<Cine[]>(
      API_CINE_PAGINATION + `?page=${page}&limit=${size}`
    );
  }

  // Obtener un cine por ID
  public getById(id: number): Observable<Cine> {
    // return this.httpClient.get<Cine>(API_CINE_GET + `/${id}`);
    return this.httpClient.get<Cine[]>(`${API_CINE_GET}/${id}`).pipe(
      map((response) => response[0]) // Toma el primer cine del array
  );
  }

  // Crear un nuevo cine
  public createCine(cine: Cine): Observable<any> {
    return this.httpClient.post<Cine>(API_CINE_ADD, cine);
  }

  // Eliminar un cine por ID
  public deleteCine(id: number): Observable<any> {
    return this.httpClient.delete(API_CINE_DELETE + `/${id}`);
  }

  // Método para actualizar un cine
  public updateCine(cine: Cine): Observable<Cine> {
    return this.httpClient.put<Cine>(API_CINE_UPDATE, cine);
  }
}
