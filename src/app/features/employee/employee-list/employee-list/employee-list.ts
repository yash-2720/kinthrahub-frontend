import { Component, OnInit } from '@angular/core';
import { EmployeeResponse } from '../../employee-response.model';
import { EmployeeService } from '../../employee.service';
import { NgModel } from '@angular/forms';
import { CommonModule, NgFor } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatTableModule } from '@angular/material/table';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [
    CommonModule,
    // RouterOutlet,
    MatToolbarModule,
    MatSidenavModule,
    MatButtonModule,
    MatListModule,
    MatTableModule,
  ],
  templateUrl: './employee-list.html',
  styleUrl: './employee-list.css',
})
export class EmployeeList implements OnInit {
  constructor(private employeeService: EmployeeService, private cdr: ChangeDetectorRef) {
    console.log('Constructor');
  }

  employees: EmployeeResponse[] = [];

  page = 0;

  size = 10;

  search = '';

  active = true;

  displayedColumns: string[] = [
    'employeeId',
    'employeeNumber',
    'employeeName',
    'employeeEmail',
    'employeePhoneNumber',
  ];

  ngOnInit() {
    console.log('ngOnInit');
    this.loadEmployees();
    console.log(this.employees);
    
  }

  loadEmployees() {
    this.employeeService.getAllEmployees(this.page, this.size, this.search, this.active).subscribe({
      next: (response) => {
        console.log('Before assignment:', this.employees.length);
        console.log(response.content)
        this.employees = response.content;
            // TODO:
          // Temporary workaround for Angular 22 rendering issue.
          // Remove after upgrading Angular or identifying the root cause.
        this.cdr.detectChanges();
        console.log('After assignment:', this.employees.length);
      },
    });
  }

//   loadEmployees() {

//     this.employees = [
//         {
//             employeeId: '1',
//             employeeNumber: 'EMP001',
//             employeeName: 'Rahul',
//             employeeEmail: 'rahul@test.com',
//             employeePhoneNumber: '9999999999',
//             basicSalary: 10000,
//             active: true
//         }
//     ];

// }
}


// import { Component, OnInit } from '@angular/core';
// import { EmployeeResponse } from '../../employee-response.model';
// import { EmployeeService } from '../../employee.service';
// import { CommonModule } from '@angular/common';
// import { MatToolbarModule } from '@angular/material/toolbar';
// import { MatSidenavModule } from '@angular/material/sidenav';
// import { MatButtonModule } from '@angular/material/button';
// import { MatListModule } from '@angular/material/list';
// import { MatTableModule } from '@angular/material/table';

// @Component({
//   selector: 'app-employee-list',
//   imports: [
//     CommonModule,
//     MatToolbarModule,
//     MatSidenavModule,
//     MatButtonModule,
//     MatListModule,
//     MatTableModule,
//   ],
//   templateUrl: './employee-list.html',
//   styleUrl: './employee-list.css',
// })
// export class EmployeeList implements OnInit {
//   constructor(private employeeService: EmployeeService) {}

//   employees: EmployeeResponse[] = [];
//   page = 0;
//   size = 10;
//   search = '';
//   active = true;
//   loadError: string | null = null;

//   displayedColumns: string[] = [
//     'employeeId',
//     'employeeNumber',
//     'employeeName',
//     'employeeEmail',
//     'employeePhoneNumber',
//   ];

//   ngOnInit() {
//     this.loadEmployees();
//   }

//   loadEmployees() {
//     this.loadError = null;
//     this.employeeService.getAllEmployees(this.page, this.size, this.search, this.active).subscribe({
//       next: (response) => {
//         console.log('Raw API response:', response); // TEMP: check this shape against PageResponse<T>
//         // Defensive guard: if `content` is missing, the payload isn't shaped
//         // like PageResponse<T> — surface it instead of failing silently.
//         this.employees = response?.content ?? [];
//         if (!response?.content) {
//           console.warn('response.content was missing — check API envelope shape', response);
//         }
//       },
//       error: (err) => {
//         this.loadError = 'Failed to load employees.';
//         console.error('getAllEmployees failed:', err);
//       },
//     });
//   }
// }