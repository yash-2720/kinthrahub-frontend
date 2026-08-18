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
// import { DonationWorkFlowItem};

@Component({
  selector: 'app-donation-request',
  imports: [SelectDonationPlans, CommonModule, ConfigureDonations, ReviewSubmit],
  templateUrl: './donation-request.html',
  styleUrl: './donation-request.css',
})
export class DonationRequestComponent {
  constructor(
    private cdr: ChangeDetectorRef,
    private employeeService: EmployeeService,
    private donationRequestService: DonationRequestService,
    private snackbar: SnackbarService,
  ) {}

  currentSteps = 0;
  donationWorkflowItems: DonationWorkflowItem[] = [];
  donationRequests: DonationRequest[] = [];

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
    if (this.donationWorkflowItems.length === 0) {
      return;
    }

    this.employeeService.getCurrentEmployee().subscribe({
      next: (employee) => {
        const donationRequests: DonationRequest[] = this.donationWorkflowItems.map((item) => {
          return {
            employeeId: employee.employeeId,
            donationPlanId: item.donationPlanId,
            donationType: item.donationType!,
            donationAmount: item.donationAmount!,
            donationStartDate: item.donationStartDate!,
            donationEndDate: item.donationEndDate ?? null,
          };
        });

        donationRequests.forEach((request) => {
          this.donationRequestService.createDonationRequest(request).subscribe({
            next: (response) => {
              console.log('Donation request created:', response);
              this.snackbar.success('Donation request submitted successfully.');
            },

            error: (error) => {
              console.error('Error creating donation request:', error);
              this.snackbar.error(error?.error?.message || 'Failed to submit donation request.');
            },
          });
        });
      },

      error: (error) => {
         this.snackbar.error(error?.error?.message || 'Failed to Fetch  Current Employee.');
      },
    });
  }
}
