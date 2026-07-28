import { Routes } from '@angular/router';
import { Login } from './features/authentication/login/login';
import { ProtectedPage } from './features/test/protected-page/protected-page';
import { authGuard } from './core/guards/auth-guard';
import { Dashboard } from './features/dashboard/dashboard/dashboard';
import { EmployeeList } from './features/employee/employee-list/employee-list/employee-list';
import { TestComponent } from './features/test/test';

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
    path:'dashboard',
    component: Dashboard,
    canActivate: [authGuard]
  },
  {
    path:'protected-page',
    component: ProtectedPage,
    canActivate: [authGuard]
  },{
    path:'employee-list',
    component: EmployeeList,
    canActivate: [authGuard]
  },
  {
    path: 'test',
    component: TestComponent
  },
  {
    path: '**',
    redirectTo: 'login'
  }
];
