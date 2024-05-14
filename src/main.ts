import { bootstrapApplication } from '@angular/platform-browser';
import { getAnalytics } from 'firebase/analytics';
import { initializeApp } from 'firebase/app';
import { environment } from '../src/environments/environment';
import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';

bootstrapApplication(AppComponent, appConfig).catch((err) =>
  console.error(err)
);

const app = initializeApp(environment.firebaseConfig);
const analytics = getAnalytics(app);
