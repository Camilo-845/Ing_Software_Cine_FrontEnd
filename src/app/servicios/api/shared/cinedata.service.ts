import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CineDataService {
  private cineIdSource = new BehaviorSubject<number | null>(null);
  cineId$ = this.cineIdSource.asObservable();

  setCineId(id: number): void {
    this.cineIdSource.next(id);
  }
}
