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
import { MatDialog } from '@angular/material/dialog';
import { RunPayrollDialog } from '../../payroll-dialog-box/run-payroll-dialog/run-payroll-dialog/run-payroll-dialog';
import { RunPayrollConfirmationDialog } from '../../payroll-dialog-box/run-payroll-confirmation-dialog/run-payroll-confirmation-dialog/run-payroll-confirmation-dialog';
import type { PayrollRequest } from '../../models/payroll-request';
import { PayrollSuccessDialog } from '../../payroll-dialog-box/payroll-success-dialog/payroll-success-dialog/payroll-success-dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import  { SnackbarService } from '../../../../shared/services/snackbar.service';

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
    MatProgressSpinnerModule,
  ],
  templateUrl: './payroll-component.html',
  styleUrl: './payroll-component.css',
})
export class PayrollComponent implements OnInit {
  constructor(
    private payrollService: PayrollService,
    private cdr: ChangeDetectorRef,
    private dialog: MatDialog,
    private snackbar : SnackbarService
  ) {}

  payrollRecords: PayrollResponse[] = [];
  search = '';
  searchSubject = new Subject<string>();
  page = 0;
  size = 5;
  totalElements = 0;
  isPayrollProcessing = false;

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
        this.snackbar.error('Error retrieving payroll records.');
        console.error('Error retrieving payroll records:', error);
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

  openRunPayrollDialog(): void {
    const dialogRef = this.dialog.open(RunPayrollDialog, {
      width: '450px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (!result) {
        return;
      }

      const confirmationDialog = this.dialog.open(RunPayrollConfirmationDialog, {
        width: '450px',
        data: {
          payrollMonth: Number(result.payrollMonth),
          payrollYear: Number(result.payrollYear),
        },
      });

      confirmationDialog.afterClosed().subscribe((confirmed) => {
        if (confirmed) {
          this.executePayroll(result);
        }
      });
    });
  }
  executePayroll(result: PayrollRequest): void {
    this.isPayrollProcessing = true;
    this.payrollService.executePayroll(result).subscribe({
      next: (response) => {
        this.isPayrollProcessing = false;
        console.log('Payroll executed successfully:', response);
        const dialogRef = this.dialog.open(PayrollSuccessDialog, {
          width: '500px',
          data: response,
        });

        dialogRef.afterClosed().subscribe(() => {
          this.loadPayroll();
        });
      },

      error: (error) => {
        this.isPayrollProcessing = false;
        this.snackbar.error('Payroll execution failed. Please try again.');
        console.error('Payroll execution failed:', error);

      },
    });
  }
}
