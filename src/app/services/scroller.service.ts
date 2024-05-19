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

  scrollToLeft(container: Element, offset: number = 400): void {
    if (!container) {
      return;
    }
    const currentScrollLeft: number = container.scrollLeft;
    const newScrollLeft: number = Math.max(currentScrollLeft - offset, 0);
    container.scrollTo({ behavior: 'smooth', left: newScrollLeft });
  }

  scrollToRight(container: Element, offset: number = 400): void {
    if (!container) {
      return;
    }
    const containerWidth: number = container.scrollWidth;
    const currentScrollLeft: number = container.scrollLeft;
    const clientWidth: number = container.clientWidth;
    const maxScrollLeft: number = containerWidth - clientWidth;
    let newScrollLeft: number = currentScrollLeft + offset;
    newScrollLeft = Math.min(newScrollLeft, maxScrollLeft);
    container.scrollTo({ behavior: 'smooth', left: newScrollLeft });
  }
}
