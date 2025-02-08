import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { MerchItem } from '../interfaces/merch-item';
import { of } from 'rxjs/internal/observable/of';
import { catchError } from 'rxjs/internal/operators/catchError';

@Injectable({
  providedIn: 'root',
})
export class LoadMerchService {
  constructor(private http: HttpClient) {}

  loadMerch(): Observable<MerchItem[]> {
    const merchUrl = '../../assets/merch-list.json';

    return this.http.get<MerchItem[]>(merchUrl).pipe(
      catchError((): Observable<MerchItem[]> => {
        console.error('Failed to load merch data.');
        return of<MerchItem[]>([]);
      }),
    );
  }
}
