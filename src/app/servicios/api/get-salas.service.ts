import { Injectable } from '@angular/core';
import { API_GET_SALAS, API_GET_SALAS_BY_CINE } from '../../utils/domains/URIs';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GetSalasService {
  public urlSalas: string = API_GET_SALAS;
  public urlSalasByCine: string = API_GET_SALAS_BY_CINE;

  constructor(private http: HttpClient) {
    console.log('Servicio de salas funcionando');
  }

  public getSalas(): Observable<any> {
    return this.http.get<any>(this.urlSalas);
  }

  public getSalasByCine(idCine: number): Observable<any> {
    return this.http.get<any>(this.urlSalasByCine + idCine);
  }
}
