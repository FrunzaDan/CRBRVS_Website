import { ViewportScroller } from '@angular/common';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ScrollerService {
  constructor(private viewportScroller: ViewportScroller) {}

  scrollToTop(): void {
    this.viewportScroller.scrollToPosition([0, 0]);
  }

  scrollToLeft(container: Element): void {
    container.scrollTo({ behavior: 'smooth', left: 0 });
  }

  scrollToRight(container: Element, end: boolean = false): void {
    const containerWidth = container.scrollWidth;
    const currentScrollLeft = container.scrollLeft;

    let targetPosition: number;
    if (end) {
      targetPosition = containerWidth - container.clientWidth;
    } else {
      targetPosition = currentScrollLeft + container.clientWidth;
    }

    container.scrollTo({ behavior: 'smooth', left: targetPosition });
  }
}
