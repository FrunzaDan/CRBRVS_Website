import { ViewportScroller } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  constructor(
    private viewportScroller: ViewportScroller,
    private router: Router
  ) {}

  public scrollToSection(elementId: string): void {
    this.viewportScroller.scrollToAnchor(elementId);
    this.router.navigate([], { fragment: elementId });
  }
}
