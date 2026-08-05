import { CommonModule } from '@angular/common';
import { Component, ChangeDetectorRef, type OnInit, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatPaginatorModule, type PageEvent } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { DonationRequestService } from '../donation-request.service';
import { HospitalService } from '../../hospital/hospital.service';
import { MatDialog } from '@angular/material/dialog';
import { HospitalResponse } from '../../hospital/models/hospital-response.model';
import { SnackbarService } from '../../../shared/services/snackbar.service';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { debounceTime, distinctUntilChanged, Subject } from 'rxjs';
import { DonationPlanResponse } from '../../donation-plan/models/donation-plan-response.model';
import { DonationPlanService } from '../../donation-plan/donation-plan.service';
import type { DonationWorkflowItem } from '../models/donation-workflow-item';

@Component({
  selector: 'app-select-donation-plans',
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
    MatProgressSpinnerModule,
    MatCardModule,
    MatCheckboxModule,
  ],
  templateUrl: './select-donation-plans.html',
  styleUrl: './select-donation-plans.css',
})
export class SelectDonationPlans implements OnInit {
  hospitals: HospitalResponse[] = [];

  totalElements = 0;
  page = 0;
  size = 5;
  search = '';
  sortOrder = 'asc';
  active = true;

  searchSubject = new Subject<string>();

  donationPlansMap = new Map<string, DonationPlanResponse[]>();

   
  @Output()
  plansSelected = new EventEmitter<DonationWorkflowItem[]>();


  constructor(
    private donationRequestService: DonationRequestService,
    private donationPlanService: DonationPlanService,
    private hospitalService: HospitalService,
    private cdr: ChangeDetectorRef,
    private dialog: MatDialog,
    private snackbar: SnackbarService,
  ) {}

  ngOnInit(): void {
    this.loadHospitals();

    this.searchSubject
      .pipe(
        debounceTime(400),

        distinctUntilChanged(),
      )
      .subscribe(() => {
        this.page = 0;

        this.loadHospitals();
        this.cdr.detectChanges();
      });
  }

  loadHospitals(): void {
    const hospitalRequest = this.search.trim()
      ? this.hospitalService.searchHospitals(
          this.page,
          this.size,
          this.sortOrder,
          this.active,
          this.search,
        )
      : this.hospitalService.getAllHospitals(this.page, this.size, this.sortOrder, this.active);
    hospitalRequest.subscribe({
      next: (response) => {
        this.hospitals = response.content;
        this.totalElements = response.totalElements;

        this.hospitals.forEach(hospital => {
        this.loadDonationPlans(hospital.hospitalId);
    });
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error('Error loading hospitals:', error);
        this.snackbar.error(error?.error?.message || 'An error occurred while loading hospitals.');
        this.cdr.detectChanges();
      },
    });
  }

  loadDonationPlans(hospitalId: string): void {
    if (this.donationPlansMap.has(hospitalId)) {
      return;
    }

    this.donationPlanService.getDonationPlansByHospital(hospitalId, true).subscribe({
      next: (response) => {
        this.donationPlansMap.set(hospitalId, response);
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error('Error loading donation plans:', error);
        this.snackbar.error(
          error?.error?.message || 'An error occurred while loading donation plans.',
        );
        this.cdr.detectChanges();
      },
    });
  }
  onSearch() {
    this.page = 0;
    this.loadHospitals();
    this.cdr.detectChanges();
  }

  onPageChange(event: PageEvent): void {
    this.page = event.pageIndex;
    this.size = event.pageSize;
    this.loadHospitals();
    this.cdr.detectChanges();
  }

  goToConfiguration(): void {

    console.log("Next clicked");
    this.plansSelected.emit([]);

}
}
