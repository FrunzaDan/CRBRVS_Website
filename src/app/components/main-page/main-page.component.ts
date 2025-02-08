import { Component } from '@angular/core';
import { BackToTopComponent } from '../back-to-top/back-to-top.component';
import { ContactComponent } from '../contact/contact.component';
import { FooterComponent } from '../footer/footer.component';
import { MerchComponent } from '../merch/merch.component';
import { MusicComponent } from '../music/music.component';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-main-page',
  imports: [
    NavbarComponent,
    MusicComponent,
    MerchComponent,
    ContactComponent,
    FooterComponent,
    BackToTopComponent,
  ],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.css',
})
export class MainPageComponent {}
