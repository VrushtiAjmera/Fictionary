import { Routes } from '@angular/router';
import { LandingPage } from './features/home/pages/landing-page/landing-page';
import { Auth } from './core/components/auth/auth';

export const routes: Routes = [
  {
    path: '',
    component: LandingPage,
  },
  {
    path: 'sign-in',
    component: Auth
  }
];
