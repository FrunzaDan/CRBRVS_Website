import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';

import { Component, HostListener } from '@angular/core';
import { ScrollerService } from '../../services/scroller.service';

@Component({
    selector: 'app-back-to-top',
    imports: [],
    templateUrl: './back-to-top.component.html',
    styleUrl: './back-to-top.component.css',
    animations: [
        trigger('slide', [
            state('visible', style({ bottom: '1rem', right: '1rem' })),
            state('hidden', style({ bottom: '-3rem', right: '-3rem' })),
            transition('visible <=> hidden', animate('300ms')),
        ]),
    ]
})
export class BackToTopComponent {
  private prevScrollPos: number = 0;
  SHOW_BUTTON_THRESHOLD: number = 1200;

  constructor(public scrollerService: ScrollerService) {}

  shouldShowBackToTopButton = false;

  @HostListener('window:scroll', ['$event'])
  onWindowScroll($event: any): void {
    const currentScrollPos: number = window.scrollY;
    const scrolledEnough: boolean =
      Math.abs(currentScrollPos - this.prevScrollPos) > 400;
    if (scrolledEnough) {
      this.shouldShowBackToTopButton =
        currentScrollPos > this.SHOW_BUTTON_THRESHOLD;
      this.prevScrollPos = currentScrollPos;
    }
  }
}
