import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { delay, Observable, of } from 'rxjs';
import { DeadlineResponse } from '../modal/DeadlineResponse';

@Injectable({
  providedIn: 'root'
})
export class CounterService {

  constructor(private http: HttpClient) {}

  getDeadlines(): Observable<DeadlineResponse> {
    return this.http.get<DeadlineResponse>('/api/deadline');
    // return of({ secondsLeft: 60 }).pipe(delay(500));
  }
}
