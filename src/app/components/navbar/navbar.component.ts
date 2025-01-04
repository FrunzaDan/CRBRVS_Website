import { ViewportScroller } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
    selector: 'app-navbar',
    imports: [RouterModule],
    templateUrl: './navbar.component.html',
    styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  constructor(
    private viewportScroller: ViewportScroller,
    private router: Router
  ) {}

  public scrollToSection(elementId: string): void {
    if (!elementId) {
      console.warn('scrollToSection: Invalid element ID provided.');
      return;
    }
    this.viewportScroller.scrollToAnchor(elementId);
    this.router.navigate([], { fragment: elementId });
  }
}
