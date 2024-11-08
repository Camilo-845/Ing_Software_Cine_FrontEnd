import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Observable } from 'rxjs';
import{
    API_RESERVACIONES,
    API_RESERVACIONES_ADD,
    API_RESERVACIONES_DELETE,
    API_RESERVACIONES_LIST,
    API_RESERVACIONES_PAGINATION
} from '../../utils/URIs';
import { Reservacion } from "../../interfaces/reservacion";

@Injectable({
    providedIn: 'root',
})
export class ReservacionesService {
    private httpClient = inject(HttpClient);

    public getAll(): Observable<Reservacion[]>{
        return this.httpClient.get<Reservacion[]>(API_RESERVACIONES_LIST);
    }

    public getPagination(page: number, size:number): Observable<Reservacion[]>{
        return this.httpClient.get<Reservacion[]>(
            API_RESERVACIONES_PAGINATION + `?page=${page}&limit=${size}`
        );
    }

    public getById(id:number): Observable<Reservacion[]>{
        return this.httpClient.get<Reservacion[]>(API_RESERVACIONES + `/${id}`);
    }

    public delteReservacion(id:number): Observable<any>{
        return this.httpClient.delete(API_RESERVACIONES_DELETE + `/${id}`);
    }

    public createReservacion(reservacion: Reservacion): Observable<any>{
        return this.httpClient.post<Reservacion>(API_RESERVACIONES_ADD, reservacion);
    }
}