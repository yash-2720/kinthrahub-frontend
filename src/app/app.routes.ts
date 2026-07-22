import { Routes } from '@angular/router';
import { Login } from './features/authentication/login/login';
import { ProtectedPage } from './features/test/protected-page/protected-page';
import { authGuard } from './core/guards/auth-guard';

export const routes: Routes = [

  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path:'login',
    component: Login
  },
  {
    path:'protected',
    component: ProtectedPage,
    canActivate: [authGuard]
  },
  {
    path: '**',
    redirectTo: 'login'
  }
];
