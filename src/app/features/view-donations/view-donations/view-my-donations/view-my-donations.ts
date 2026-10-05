import { Component, ChangeDetectorRef, type OnInit } from '@angular/core';
import { DonationRequestService } from '../../../donation-request/donation-request.service';
import type { DonationRequestResponse } from '../../../donation-request/models/donation-request-response';
import { debounce, debounceTime, distinctUntilChanged, Subject, type Observable } from 'rxjs';
import { SnackbarService } from '../../../../shared/services/snackbar.service';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule, type PageEvent } from '@angular/material/paginator';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { EmployeeViewDialog } from '../../../employee/components/employee-view-dialog/employee-view-dialog';
import { ViewDetailsDialog } from '../../view-details-dialog/view-details-dialog/view-details-dialog';
import { DeleteDonationDialog } from '../../view-details-dialog/delete-donation-dialog/delete-donation-dialog/delete-donation-dialog';
import { DonationStatus } from '../../../donation-request/enums/donation-status.enum';
import { DonationType } from '../../../donation-request/enums/donation-type.enum';
import { MatSelectModule } from '@angular/material/select';
import { KeyValuePipe } from '@angular/common';
import  { TokenService } from '../../../../core/services/token.service';

@Component({
  selector: 'app-view-my-donations',
  imports: [
    FormsModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatPaginatorModule,
    MatIconModule,
    MatDialogModule,
    MatSelectModule,
    KeyValuePipe
],
  templateUrl: './view-my-donations.html',
  styleUrl: './view-my-donations.css',
})
export class ViewMyDonations implements OnInit {
  totalElements = 0;
  page = 0;
  size = 5;
  active = true;
  search = '';
  searchSubject = new Subject<string>();
  donationRequests: DonationRequestResponse[] = [];
  DonationStatus = DonationStatus; // Expose the enum to the template
  DonationType = DonationType;


  selectedDonationStatus: DonationStatus | null = null;
  selectedDonationType: DonationType | null = null;
  myDonations = true;
  role : string | null = null;
  constructor(
    private donationRequestService: DonationRequestService,
    private cdr: ChangeDetectorRef,
    private snackbar: SnackbarService,
    private dialog: MatDialog,
    private tokenService : TokenService
  ) {}



  ngOnInit(): void {
    this.loadDonationRequests();

    this.searchSubject.pipe(debounceTime(400), distinctUntilChanged()).subscribe(() => {
      this.page = 0;
      this.loadDonationRequests();
      this.cdr.detectChanges();
    });

    this.role = this.tokenService.getRole();
    console.log('Role in view-my-donations : ', this.role);
  }

  loadDonationRequests(): void {
    const request = this.search.trim()
      ? this.donationRequestService.searchDonationRequests(
          this.page,
          this.size,
          this.active,
          this.search,
          this.selectedDonationStatus,
          this.selectedDonationType,
          this.myDonations,
        )
      : this.donationRequestService.getAllDonationRequests(
          this.page,
          this.size,
          this.active,
          this.selectedDonationStatus,
          this.selectedDonationType,
          this.myDonations,
        );
    request.subscribe({
      next: (response) => {
        this.donationRequests = response.content;
        this.totalElements = response.totalElements;
        console.log('Donation Requests : ', this.donationRequests);
        this.cdr.detectChanges();
      },
      error: (error) => {
        this.snackbar.error(error?.error?.message);
      },
    });
  }

  onSearch(): void {
    this.searchSubject.next(this.search);
    this.cdr.detectChanges();
  }

  onPageChange(event: PageEvent): void {
    this.page = event.pageIndex;
    this.size = event.pageSize;
    this.loadDonationRequests();
    this.cdr.detectChanges();
  }

  onFilterChange(): void {
    this.page = 0;
    this.loadDonationRequests();
  }

  openViewDialog(donationRequestId: String): void {
    console.log('Open view dialog clicked');
    this.dialog.open(ViewDetailsDialog, { data: { donationRequestId: donationRequestId } });
  }

  //  openDeleteDialog(donationRequestId: String): void {
  // console.log("Open view dialog clicked");
  //   this.dialog.open(DeleteDonationDialog, { data: { donationRequestId: donationRequestId } });
  // }

  openDeleteDialog(donationRequestId: string): void {
    const dialogRef = this.dialog.open(DeleteDonationDialog, {
      data: {
        donationRequestId: donationRequestId,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.loadDonationRequests();
      }
    });
  }
}
