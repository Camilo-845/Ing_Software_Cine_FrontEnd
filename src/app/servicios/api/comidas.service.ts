import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import {
  API_COMIDAS_ADD,
  API_COMIDAS_LIST,
  API_COMIDAS_UPDATE,
  API_COMIDAS_DELETE,
} from '../../utils/URIs';
import { Observable } from 'rxjs';
import { Comida } from '../../interfaces/comidas';

@Injectable({
  providedIn: 'root',
})
export class ComidaService {
  private httpClient = inject(HttpClient);

  public getAll(page:number = 1, limit:number = 10): Observable<Comida[]> {
    return this.httpClient.get<Comida[]>(API_COMIDAS_LIST + `?page=${page}&&limit=${limit}`);
  }

  public createComida(Comida: Comida): Observable<any> {
    return this.httpClient.post<Comida>(API_COMIDAS_ADD, Comida);
  }

  public deleteComida(id: number): Observable<any> {
    return this.httpClient.delete(API_COMIDAS_DELETE + `/${id}`);
  }
  public updateComida(data: Comida): Observable<any> {
    return this.httpClient.put(API_COMIDAS_UPDATE,data);
  }
}
