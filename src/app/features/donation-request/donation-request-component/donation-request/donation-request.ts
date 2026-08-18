import { Component, ChangeDetectorRef } from '@angular/core';
import type { DonationWorkflowItem } from '../../models/donation-workflow-item';
import { SelectDonationPlans } from '../../select-donation-plans/select-donation-plans';
import { CommonModule } from '@angular/common';
import { ConfigureDonations } from '../../configure-donations/configure-donations/configure-donations';
import type { DonationRequest } from '../../models/donation-request';
import { ReviewSubmit } from '../../review-and-submit/review-submit/review-submit';
import { EmployeeService } from '../../../employee/employee.service';
import { DonationRequestService } from '../../donation-request.service';
import { SnackbarService } from '../../../../shared/services/snackbar.service';
import { forkJoin } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { DonationSubmitSuccess } from '../../donation-request-success-modal/donation-submit-success/donation-submit-success';
import  { Router } from '@angular/router';

// import { DonationWorkFlowItem};

@Component({
  selector: 'app-donation-request',
  imports: [SelectDonationPlans, CommonModule, ConfigureDonations, ReviewSubmit, DonationSubmitSuccess],
  templateUrl: './donation-request.html',
  styleUrl: './donation-request.css',
})
export class DonationRequestComponent {
  constructor(
    private cdr: ChangeDetectorRef,
    private employeeService: EmployeeService,
    private donationRequestService: DonationRequestService,
    private snackbar: SnackbarService,
    private dialog: MatDialog,
      private router: Router,
  ) {}

  currentSteps = 0;
  donationWorkflowItems: DonationWorkflowItem[] = [];
  donationRequests: DonationRequest[] = [];
  isSubmitting = false;

  goToNextStep(): void {
    this.currentSteps++;
    this.cdr.detectChanges();
  }
  goToPreviousStep(): void {
    this.currentSteps--;
    this.cdr.detectChanges();
  }

  onPlansSelected(items: DonationWorkflowItem[]): void {
    // alert("Parent received event");
    console.log('From parent component : ', items);
    this.donationWorkflowItems = items;
    this.goToNextStep();
  }

  // onConfigureDonations(donations: DonationRequest[]):void{
  //   console.log("Donation Requests : ", donations);
  //   this.donationRequests = donations;
  //   this.goToNextStep();
  // }

  onConfigureDonations(items: DonationWorkflowItem[]): void {
    console.log('Configured Workflow Items:', items);
    this.donationWorkflowItems = items;
    this.goToNextStep();
  }

  editDonations(): void {
    this.currentSteps = 1;
  }
  removeDonation(donationPlanId: string): void {
    this.donationWorkflowItems = this.donationWorkflowItems.filter(
      (item) => item.donationPlanId !== donationPlanId,
    );
  }

  submitDonations(): void {

  if (
    this.donationWorkflowItems.length === 0 ||
    this.isSubmitting
  ) {
    return;
  }

  this.isSubmitting = true;

  this.employeeService.getCurrentEmployee().subscribe({

    next: (employee) => {

      const donationRequests: DonationRequest[] =
        this.donationWorkflowItems.map((item) => {

          return {
            employeeId: employee.employeeId,
            donationPlanId: item.donationPlanId,
            donationType: item.donationType!,
            donationAmount: item.donationAmount!,
            donationStartDate: item.donationStartDate!,
            donationEndDate: item.donationEndDate ?? null,
          };

        });

      const requests = donationRequests.map((request) =>
        this.donationRequestService.createDonationRequest(request)
      );

      forkJoin(requests).subscribe({

        next: (responses) => {

          console.log('All donation requests submitted:', responses);

          this.isSubmitting = false;

          this.openSuccessDialog();

        },

        error: (error) => {

          console.error(
            'Error submitting donation requests:',
            error
          );

          this.isSubmitting = false;

          this.snackbar.error(
            error?.error?.message ||
            'Failed to submit donation request.'
          );

        },

      });

    },

    error: (error) => {

      console.error(
        'Error fetching current employee:',
        error
      );

      this.isSubmitting = false;

      this.snackbar.error(
        error?.error?.message ||
        'Unable to retrieve employee information.'
      );

    },

  });
}
openSuccessDialog(): void {

 const dialogRef = this.dialog.open(DonationSubmitSuccess, {
    width: '420px',
    disableClose: true,
  });
  dialogRef.afterClosed().subscribe(() => {
    this.router.navigate(['/dashboard']);
  });
}
}
