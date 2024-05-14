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
    const currentScrollLeft = container.scrollLeft;
    const newScrollLeft = Math.max(currentScrollLeft - offset, 0); // Ensure non-negative scroll position

    container.scrollTo({ behavior: 'smooth', left: newScrollLeft });
  }

  scrollToRight(container: Element, offset: number = 400): void {
    const containerWidth = container.scrollWidth;
    const currentScrollLeft = container.scrollLeft;
    const clientWidth = container.clientWidth;

    const maxScrollLeft = containerWidth - clientWidth; // Maximum scrollable position

    let newScrollLeft = currentScrollLeft + offset;
    newScrollLeft = Math.min(newScrollLeft, maxScrollLeft); // Limit scroll to prevent exceeding container bounds

    container.scrollTo({ behavior: 'smooth', left: newScrollLeft });
  }
}
