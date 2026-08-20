// import { Routes } from '@angular/router';
// import { Login } from './features/authentication/login/login';
// import { ProtectedPage } from './features/test/protected-page/protected-page';
// import { authGuard } from './core/guards/auth-guard';
// import { Dashboard } from './features/dashboard/dashboard/dashboard';
// import { EmployeeList } from './features/employee/employee-list/employee-list/employee-list';
// import { TestComponent } from './features/test/test';
// import { MainLayout } from './layouts/main-layout/main-layout';
// import { ApplicationUserList } from './features/application-user/application-user-list/application-user-list/application-user-list';

// export const routes: Routes = [

//   {
//     path: '',
//     redirectTo: 'login',
//     pathMatch: 'full'
//   },
//   {
//     path:'login',
//     component: Login
//   },{
//   path: '',
//   component: MainLayout,
//   canActivate: [authGuard],
//   children: [

//     {
//       path: 'dashboard',
//       component: Dashboard
//     },

//     {
//       path: 'employee-list',
//       component: EmployeeList
//     },

//     {
//       path: 'app-user-list',
//       component: ApplicationUserList
//     }

//   ]
// },
//   // {
//   //   path:'dashboard',
//   //   component: Dashboard,
//   //   canActivate: [authGuard]
//   // },
//   // {
//   //   path:'protected-page',
//   //   component: ProtectedPage,
//   //   canActivate: [authGuard]
//   // },{
//   //   path:'employee-list',
//   //   component: EmployeeList,
//   //   canActivate: [authGuard]
//   // },{
//   //   path : 'app-user-list',
//   //   component : ApplicationUserList,
//   //   canActivate: [authGuard]
//   // },
//   // {
//   //   path: 'test',
//   //   component: TestComponent
//   // },
//   //
//    {
//     path: '**',
//     redirectTo: 'login'
//   }
// ];
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

export const routes: Routes = [

  // Default Route
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },

  // Login
  {
    path: 'login',
    component: Login
  },

  // Protected Application Layout
  {
    path: '',
    component: MainLayout,
    canActivate: [authGuard],
    children: [

      {
        path: 'dashboard',
        component: Dashboard
      },

      {
        path: 'employee-list',
        component: EmployeeList
      },

      {
        path: 'app-user-list',
        component: ApplicationUserList
      },{
        path:'app-donation-request',
        component : DonationRequestComponent
      },
      {
        path :'view-donations',
        component : ViewMyDonations
      },
      {
        path:'payrollrun',
        component: PayrollComponent
      },

      // Temporary pages
      {
        path: 'protected-page',
        component: ProtectedPage
      },

      {
        path: 'test',
        component: TestComponent
      }

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

    ]
  },

  // Wildcard
  {
    path: '**',
    redirectTo: 'login'
  }

];