import { Component, ChangeDetectorRef, type OnInit } from '@angular/core';
import { PayrollService } from '../../payroll.service';
import type { PayrollResponse } from '../../models/payroll-response';
import { CommonModule } from '@angular/common';
import { PageEvent, MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { Subject } from 'rxjs/internal/Subject';
import { debounceTime, distinctUntilChanged } from 'rxjs';

@Component({
  selector: 'app-payroll-component',
  imports: [
    CommonModule,
    MatPaginatorModule,
    MatIconModule,
    CommonModule,
    FormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './payroll-component.html',
  styleUrl: './payroll-component.css',
})
export class PayrollComponent implements OnInit {
  constructor(
    private payrollService: PayrollService,
    private cdr: ChangeDetectorRef,
  ) {}

  payrollRecords: PayrollResponse[] = [];
  search = '';
  searchSubject = new Subject<string>();
  page = 0;
  size = 5;
  totalElements = 0;

  displayedColumns = ['payrollRunId', 'payrollPeriod', 'processed', 'status', 'processedOn'];

  ngOnInit(): void {
    this.loadPayroll();

    this.searchSubject.pipe(debounceTime(400), distinctUntilChanged()).subscribe(() => {
      this.page = 0;

      this.loadPayroll();
    });
    this.cdr.detectChanges();
  }

  loadPayroll(): void {
    const request = this.search.trim()
      ? this.payrollService.searchPayrolls(this.page, this.size, this.search)
      : this.payrollService.getAllPayrollRecords(this.page, this.size);

    request.subscribe({
      next: (response) => {
        this.payrollRecords = response.content;
        this.totalElements = response.totalElements;
        console.log(this.payrollRecords);
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.log('Error retriving payroll');
      },
    });
  }

  onSearch(): void {
    this.searchSubject.next(this.search);
  }

  onPageChange(event: PageEvent): void {
    this.page = event.pageIndex;
    this.size = event.pageSize;
    this.loadPayroll();
    this.cdr.detectChanges();
  }
}
