import { Routes } from '@angular/router';
import { MusicComponent } from './components/music/music.component';
import { MerchComponent } from './components/merch/merch.component';
import { ContactComponent } from './components/contact/contact.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';

export const routes: Routes = [
  {
    path: 'music',
    component: MusicComponent,
    title: 'Music',
  },
  {
    path: 'merch',
    component: MerchComponent,
    title: 'Merch',
  },
  {
    path: 'contact',
    component: ContactComponent,
    title: 'Contact',
  },
];
