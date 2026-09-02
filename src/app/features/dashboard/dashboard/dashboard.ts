import { Component, ChangeDetectorRef } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { DonationRequestService } from '../../donation-request/donation-request.service';
import { EmployeeService } from '../../employee/employee.service';
import { DashboardService } from '../dashboard.service';
import { TokenService } from '../../../core/services/token.service';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { PayrollService } from '../../payroll/payroll.service';
import  { SnackbarService } from '../../../shared/services/snackbar.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatSidenavModule,
    MatButtonModule,
    MatListModule,
    MatIconModule,
    MatCardModule,
    CommonModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {
  constructor(
    private cdr: ChangeDetectorRef,
    private employeeService: EmployeeService,
    private donationRequestService: DonationRequestService,
    private dashboardService: DashboardService,
    private tokenService: TokenService,
    private payrollService: PayrollService,
    private snackbar : SnackbarService,
  ) {}

  myActiveDonations = 0;

  myTotalDonationAmount = 0;

  totalDonation = 0;
  allActiveDonations = 0;

  isMyDataLoading = true;
  isAllDataLoading = true;

  isPayrollDataLoading = true;

  role: string | null = null;

  payrollData: any = null;

  ngOnInit(): void {
    this.role = this.tokenService.getRole();
    this.loadMyData();
    if (this.role === 'ROLE_ADMIN') {
      this.loadAllData();
    }
    if(this.role== 'ROLE_PAYROLL_ADMIN' || this.role === 'ROLE_ADMIN'){
      this.loadPayrollData();
    }
  }

  loadPayrollData(): void {
    this.payrollService.getLatestPayroll().subscribe({
      next : (response)=>{
        this.payrollData = response;
        console.log('Payroll Data:', this.payrollData);
        this.isPayrollDataLoading = false;
        this.cdr.detectChanges(); 
      },
      error : (error)=>{
        this.snackbar.error( error? error.message : 'Error loading payroll data.');
      }
    })
  }

  loadMyData(): void {
    this.dashboardService.getMyDonationSummary().subscribe({
      next: (response) => {
        this.myActiveDonations = response.activeDonations;
        this.myTotalDonationAmount = response.totalDonationAmount;
        console.log('My Active Donations:', this.myActiveDonations);
        console.log('My Donations Total:', this.myTotalDonationAmount);
        this.isMyDataLoading = false;
        this.cdr.detectChanges();
      },
      error:(error)=>{
        this.snackbar.error( error? error.message : 'Error loading my donation summary.');
      }

    });
  }

  loadAllData(): void {
    this.dashboardService.getAllDonationSummary().subscribe({
      next: (response) => {
        this.allActiveDonations = response.activeDonations;
        this.totalDonation = response.totalDonationAmount;
        console.log('All Active Donations:', this.allActiveDonations);
        console.log('All Donations Total:', this.totalDonation);
        this.isAllDataLoading = false;
        this.cdr.detectChanges();
      },
      error: (error) => {
         this.snackbar.error( error? error.message : 'Error loading all donation summary.');
        console.error('Error loading all donation summary:', error);
      },
    });
  }
}
