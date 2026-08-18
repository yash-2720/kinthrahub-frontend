import { Component, EventEmitter, Input, Output, ChangeDetectorRef } from '@angular/core';
import { DonationWorkflowItem } from '../../models/donation-workflow-item';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { EmployeeService } from '../../../employee/employee.service';
import type { DonationRequest } from '../../models/donation-request';

@Component({
  selector: 'app-review-submit',
  imports: [CommonModule, MatCardModule, MatButtonModule],
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
