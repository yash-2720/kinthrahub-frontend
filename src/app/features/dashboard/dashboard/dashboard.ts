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
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";

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
    MatProgressSpinnerModule
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
    private tokenService : TokenService
  ) {}

  myActiveDonations = 0;

  myTotalDonationAmount = 0;

  totalDonation = 0;
  allActiveDonations = 0;

  isMyDataLoading = true;
  isAllDataLoading = true;

  role : string | null = null;

  ngOnInit(): void {
    
    this.role = this.tokenService.getRole();
    this.loadMyData();
    if(this.role === 'ROLE_ADMIN'){
      this.loadAllData();
    }
    
    
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
        console.error('Error loading all donation summary:', error);
      },
    });
  }


}
