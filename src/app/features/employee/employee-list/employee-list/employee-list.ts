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
    MatPaginatorModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatTooltipModule,
    FormsModule
   
],
  templateUrl: './employee-list.html',
  styleUrl: './employee-list.css',
})
export class EmployeeList implements OnInit {

  constructor(
    private employeeService: EmployeeService,
    private cdr: ChangeDetectorRef,
    private dialogue : MatDialog
  ) {
    console.log('Constructor');
  }

  employees: EmployeeResponse[] = [];

  totalElements = 0;

  page = 0;

  size = 5;

  search = '';

  active = true;

  displayedColumns: string[] = [
    'employeeId',
    'employeeNumber',
    'employeeName',
    'employeeEmail',
    'employeePhoneNumber',
    'actions'
  ];

  ngOnInit() {
    console.log('ngOnInit');
    this.loadEmployees();
    console.log(this.employees);
  }



 loadEmployees(): void {

  const request = this.search.trim()
    ? this.employeeService.searchEmployees(
        this.page,
        this.size,
        this.search,
        this.active
      )
    : this.employeeService.getAllEmployees(
        this.page,
        this.size,
        this.search,
        this.active
      );

  request.subscribe({
    next: (response) => {
      this.employees = response.content;
      this.totalElements = response.totalElements;
      this.cdr.detectChanges();
    }
  });

}

  onPageChange(event: PageEvent): void {
    this.page = event.pageIndex;

    this.size = event.pageSize;

    this.loadEmployees();
  }

  onSearch() {
    this.page = 0; // Reset to the first page when searching
    this.loadEmployees();
  }


  openViewDialogue(employeeId : String) : void{
    this.dialogue.open(EmployeeViewDialog,{data : {employeeId : employeeId}});

  }
}
