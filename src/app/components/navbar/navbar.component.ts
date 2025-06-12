import { ViewportScroller } from '@angular/common';
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { HamburgerButtonComponent } from '../hamburger-button/hamburger-button.component';

@Component({
  selector: 'app-navbar',
  imports: [RouterModule, HamburgerButtonComponent],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavbarComponent {
  isMenuOpen = signal(false);

  constructor(
    private viewportScroller: ViewportScroller,
    private router: Router,
  ) {}

  public scrollToSection(elementId: string): void {
    if (!elementId) {
      console.warn('scrollToSection: Invalid element ID provided.');
      return;
    }
    this.viewportScroller.scrollToAnchor(elementId);
    this.router.navigate([], { fragment: elementId });
  }

  onToggleMenu(isOpen: boolean) {
    this.isMenuOpen.set(isOpen);
  }

  closeMenu() {
    this.isMenuOpen.set(false);
  }
}
