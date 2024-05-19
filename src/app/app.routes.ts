import { Routes } from '@angular/router';
import { MainPageComponent } from './components/main-page/main-page.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { MusicComponent } from './components/music/music.component';

export const routes: Routes = [
  {
    path: '',
    component: MainPageComponent,
    title: 'CRBRVS Rap Hive',
  },
  {
    path: '**',
    component: PageNotFoundComponent,
    title: '404',
  },
];
