import { Injectable } from '@angular/core';
import merchData from '../../../public/assets/merch-list.json';
import { MerchItem } from '../interfaces/merch-item';

@Injectable({
  providedIn: 'root',
})
export class LoadMerchService {
  loadMerch(): MerchItem[] {
    return merchData;
  }
}
