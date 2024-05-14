import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScrollerService } from '../../services/scroller.service';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';

@Component({
  selector: 'app-back-to-top',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './back-to-top.component.html',
  styleUrl: './back-to-top.component.css',
  animations: [
    trigger('slide', [
      state('visible', style({ bottom: '1rem', right: '1rem' })),
      state('hidden', style({ bottom: '-3rem', right: '-3rem' })),
      transition('visible <=> hidden', animate('300ms')),
    ]),
  ],
})
export class BackToTopComponent {
  constructor(private scrollerService: ScrollerService) {}

  shouldShowBackToTopButton = false;

  @HostListener('window:scroll', ['$event'])
  onWindowScroll($event: any) {
    this.shouldShowBackToTopButton = window.scrollY > 500;
  }

  topFunction(): void {
    this.scrollerService.scrollToTop();
  }
}
