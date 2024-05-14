import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { MerchItem } from '../interfaces/merch-item';

@Injectable({
  providedIn: 'root',
})
export class LoadMerchService {
  constructor(private http: HttpClient) {}

  loadMusic(): Observable<MerchItem[]> {
    return this.http.get<MerchItem[]>('../../assets/merch-list.json');
  }
}
