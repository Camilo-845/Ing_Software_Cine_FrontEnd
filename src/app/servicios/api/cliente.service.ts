import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import {
  API_CLIENTE,
  API_CLIENTE_ADD,
  API_CLIENTE_DELETE,
  API_CLIENTE_LIST,
  API_CLIENTE_PAGINATION,
} from '../../utils/URIs';
import { Observable } from 'rxjs';
import { Cliente } from '../../interfaces/cliente';

@Injectable({
  providedIn: 'root',
})
export class ClienteService {
  private httpClient = inject(HttpClient);

  public getAll(): Observable<Cliente[]> {
    return this.httpClient.get<Cliente[]>(API_CLIENTE_LIST);
  }

  public getPagination(page: number, size: number): Observable<Cliente[]> {
    return this.httpClient.get<Cliente[]>(
      API_CLIENTE_PAGINATION + `?page=${page}&limit=${size}`
    );
  }

  public getById(id: number): Observable<Cliente[]> {
    return this.httpClient.get<Cliente[]>(API_CLIENTE + `/${id}`);
  }

  public createClient(cliente: Cliente): Observable<any> {
    return this.httpClient.post<Cliente>(API_CLIENTE_ADD, cliente);
  }

  public deleteCliente(id: number): Observable<any> {
    return this.httpClient.delete(API_CLIENTE_DELETE + `/${id}`);
  }
}
