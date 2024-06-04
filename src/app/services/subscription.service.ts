import { Injectable } from '@angular/core';
import { Subscription } from 'rxjs/internal/Subscription';

@Injectable({
  providedIn: 'root',
})
export class SubscriptionService {
  constructor() {}

  public unsubscribeIfActive(subscription: Subscription | undefined): void {
    if (subscription) {
      subscription.unsubscribe();
      subscription = undefined;
    }
  }
}
