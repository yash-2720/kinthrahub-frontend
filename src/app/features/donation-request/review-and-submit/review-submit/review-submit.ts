import { Component, EventEmitter, Input, Output, ChangeDetectorRef } from '@angular/core';
import { DonationWorkflowItem } from '../../models/donation-workflow-item';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { EmployeeService } from '../../../employee/employee.service';
import type { DonationRequest } from '../../models/donation-request';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";

@Component({
  selector: 'app-review-submit',
  imports: [CommonModule, MatCardModule, MatButtonModule, MatIconModule, MatListModule, MatProgressSpinnerModule],
  templateUrl: './review-submit.html',
  styleUrl: './review-submit.css',
})
export class ReviewSubmit {
  constructor(
    private employeeService: EmployeeService,
    private cdr: ChangeDetectorRef,
  ) {}
  @Input()
  donationWorkflowItems: DonationWorkflowItem[] = [];

  @Output()
  editRequested = new EventEmitter<void>();

  @Output()
  removeRequested = new EventEmitter<string>();

  @Output()
  submitRequested = new EventEmitter<void>();

  @Input()
  isSubmitting = false;

  editDonation(): void {
    this.editRequested.emit();
  }

  removeDonation(donationPlanId: string): void {
    this.removeRequested.emit(donationPlanId);
  }

  submitDonation(): void {
    this.submitRequested.emit();
  }
}
