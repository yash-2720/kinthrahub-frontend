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
import { MatPaginatorModule, type PageEvent } from '@angular/material/paginator';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialog } from '@angular/material/dialog';
import { EmployeeViewDialog } from '../../components/employee-view-dialog/employee-view-dialog';
import { EmployeeDeleteDialog } from '../../components/employee-delete-dialog/employee-delete-dialog';
import  { EmployeeRequest } from '../../employee-request.model';
import { EmployeeForm } from '../../employee-form/employee-form/employee-form';
import { CreateApplicationUserDialog } from '../../../application-user/application-user-form/create-application-user-dialog/create-application-user-dialog';
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import  { SnackbarService } from '../../../../shared/services/snackbar.service';

@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [
    CommonModule,
    MatToolbarModule,
    MatSidenavModule,
    MatButtonModule,
    MatListModule,
    MatTableModule,
    MatPaginatorModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatTooltipModule,
    FormsModule,
    MatProgressSpinnerModule
],
  templateUrl: './employee-list.html',
  styleUrl: './employee-list.css',
})
export class EmployeeList implements OnInit {
  constructor(
    private employeeService: EmployeeService,
    private cdr: ChangeDetectorRef,
    private dialog: MatDialog,
    private snackbar : SnackbarService
  ) {}

  employees: EmployeeResponse[] = [];

  totalElements = 0;

  page = 0;

  size = 5;

  search = '';

  active = true;
isLoading = false;
  displayedColumns: string[] = [
    'employeeId',
    'employeeNumber',
    'employeeName',
    'employeeEmail',
    'employeePhoneNumber','User Id',
    'actions',
  ];

  ngOnInit() {
    console.log('ngOnInit');
    this.loadEmployees();
    console.log(this.employees);
  }

  loadEmployees(): void {

    this.isLoading = true;
    console.log('Loading page:', this.page);
    const request = this.search.trim()
      ? this.employeeService.searchEmployees(this.page, this.size, this.search, this.active)
      : this.employeeService.getAllEmployees(this.page, this.size, this.search, this.active);

    request.subscribe({
      next: (response) => {
        this.employees = response.content;
          console.log(response.content);
        this.totalElements = response.totalElements;
        this.isLoading = false;
          console.log(this.employees);
        this.cdr.detectChanges();
      },error:(error)=>{
        this.snackbar.error(error.error?.message);
        this.isLoading = false;
      }
    });
  }

  onPageChange(event: PageEvent): void {
     console.log('Page Event:', event);
    this.page = event.pageIndex;

    this.size = event.pageSize;

    this.loadEmployees();
  }

  onSearch() {
    this.page = 0; // Reset to the first page when searching
    this.loadEmployees();
  }

  openViewDialog(employeeId: String): void {
    this.dialog.open(EmployeeViewDialog, { data: { employeeId: employeeId } });
  }

  openDeleteDialog(employeeId: string): void {
    const dialogRef = this.dialog.open(EmployeeDeleteDialog, {
      data: {
        employeeId: employeeId,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.loadEmployees();
      }
    });
  }

  openAddEmployee(): void {
    const dialogRef = this.dialog.open(EmployeeForm, {
      width: '750px',
      maxWidth: '90vw',
      disableClose: true,
      data: {
        mode: 'add',
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.loadEmployees();
      }
    });
  }

  openEditEmployee(employeeId: string): void {
    const dialogRef = this.dialog.open(EmployeeForm, {
      width: '750px',
      maxWidth: '90vw',
      disableClose: true,
      data: {
        mode: 'edit',
        employeeId: employeeId,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.loadEmployees();
      }
    });
  }

 openAddAppUser(employee: EmployeeResponse): void {
  const dialogRef = this.dialog.open(CreateApplicationUserDialog, {
    width: '750px',
    maxWidth: '90vw',
    disableClose: true,
    data: employee
  });

  dialogRef.afterClosed().subscribe(result => {
    if (result) {
      this.loadEmployees();
    }
  });
}
}
