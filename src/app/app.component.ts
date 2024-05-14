import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Analytics } from '@angular/fire/analytics';
import { RouterOutlet } from '@angular/router';
import { BackToTopComponent } from './components/back-to-top/back-to-top.component';
import { ContactComponent } from './components/contact/contact.component';
import { FooterComponent } from './components/footer/footer.component';
import { MerchComponent } from './components/merch/merch.component';
import { MusicComponent } from './components/music/music.component';
import { NavbarComponent } from './components/navbar/navbar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    NavbarComponent,
    FooterComponent,
    BackToTopComponent,
    CommonModule,
    RouterOutlet,
    MusicComponent,
    MerchComponent,
    ContactComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  title = 'CRBRVS';

  constructor(private fireAnalytics: Analytics) {}

  ngOnInit() {}
}
