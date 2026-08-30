import { Routes } from '@angular/router';

import { authGuard } from './core/guards/auth-guard';

import { Login } from './features/authentication/login/login';
import { Dashboard } from './features/dashboard/dashboard/dashboard';
import { EmployeeList } from './features/employee/employee-list/employee-list/employee-list';
import { ApplicationUserList } from './features/application-user/application-user-list/application-user-list/application-user-list';
import { ProtectedPage } from './features/test/protected-page/protected-page';
import { TestComponent } from './features/test/test';

import { MainLayout } from './layouts/main-layout/main-layout';
// import { DonationRequest } from './features/donation-request/donation-request-component/select-donation-plam/donation-request';
import { SelectDonationPlans } from './features/donation-request/select-donation-plans/select-donation-plans';
import { DonationRequestComponent } from './features/donation-request/donation-request-component/donation-request/donation-request';
import { ViewMyDonations } from './features/view-donations/view-donations/view-my-donations/view-my-donations';
import { PayrollComponent } from './features/payroll/payroll-component/payroll-component/payroll-component';
import { roleGuard } from './core/guards/role-guard';

export const routes: Routes = [
  // Default Route
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },

  // Login
  {
    path: 'login',
    component: Login,
  },

  // Protected Application Layout
  {
    path: '',
    component: MainLayout,
    canActivate: [authGuard],
    children: [
      {
        path: 'dashboard',
        component: Dashboard,
      },

      {
        path: 'employee-list',
        component: EmployeeList,
        canActivate: [roleGuard],
        data: {
          roles: ['ROLE_ADMIN'],
        },
      },

      {
        path: 'app-user-list',
        component: ApplicationUserList,
        canActivate: [roleGuard],
        data: {
          roles: ['ROLE_ADMIN'],
        },
      },
      {
        path: 'app-donation-request',
        component: DonationRequestComponent,
        canActivate: [roleGuard],
        data: {
          roles: ['ROLE_ADMIN', 'ROLE_EMPLOYEE', 'ROLE_PAYROLL_ADMIN'],
        },
      },
      {
        path: 'view-donations',
        component: ViewMyDonations,
        canActivate: [roleGuard],
        data: {
          roles: ['ROLE_ADMIN', 'ROLE_EMPLOYEE', 'ROLE_PAYROLL_ADMIN'],
        },
      },
      {
        path: 'payrollrun',
        component: PayrollComponent,
        canActivate: [roleGuard],
        data: {
          roles: ['ROLE_ADMIN', 'ROLE_PAYROLL_ADMIN'],
        },
      },

      // Temporary pages
      {
        path: 'protected-page',
        component: ProtectedPage,
      },

      {
        path: 'test',
        component: TestComponent,
      },

      // Future Routes

      // {
      //   path: 'donate',
      //   component: DonationRequestComponent
      // },

      // {
      //   path: 'my-donations',
      //   component: MyDonationsComponent
      // },

      // {
      //   path: 'payroll',
      //   component: PayrollComponent
      // }
    ],
  },

  // Wildcard
  {
    path: '**',
    redirectTo: 'login',
  },
];
