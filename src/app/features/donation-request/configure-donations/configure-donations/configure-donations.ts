import { Component, Input, OnInit, ChangeDetectorRef, EventEmitter, Output } from '@angular/core';
import { DonationWorkflowItem } from '../../models/donation-workflow-item';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
  ValidationErrors,
  AbstractControl,
  FormArray,
  FormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DonationType } from '../../enums/donation-type.enum';
import { MatRadioModule } from '@angular/material/radio';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { EmployeeService } from '../../../employee/employee.service';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { DonationRequest } from '../../models/donation-request';

@Component({
  selector: 'app-configure-donations',
  imports: [
    ReactiveFormsModule,
    CommonModule,
    MatRadioModule,
    MatDatepickerModule,
    MatNativeDateModule,
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
  templateUrl: './configure-donations.html',
  styleUrl: './configure-donations.css',
})
export class ConfigureDonations implements OnInit {
  DonationType = DonationType;
  basicSalary: number = 0;
  employeeId: string = '';

  constructor(
    private fb: FormBuilder,
    private employeeService: EmployeeService,
    private cdr: ChangeDetectorRef,
  ) {}

  @Input()
  donationWorkflowItems: DonationWorkflowItem[] = [];

  configureDonationForms!: FormGroup;

  // @Output()
  // donationsConfigured = new EventEmitter<DonationRequest[]>();

  @Output()
  donationsConfigured = new EventEmitter<DonationWorkflowItem[]>();

  @Output()
  previousRequested = new EventEmitter<void>();

  ngOnInit(): void {
    // console.log('From child component : ', this.donationWorkflowItems);

    this.configureDonationForms = this.fb.group(
      {
        donations: this.fb.array([]),
        basicSalary: [0],
      },
      {
        validators: this.donationSalaryValidator.bind(this),
      },
    );
    this.initializeDonationForms();
    this.getCurrentEmployee();
    this.cdr.detectChanges();
    // console.log('Donations Length : ', this.donations.length);
    // console.log('Donations :', this.donations);
  }

  get donations(): FormArray {
    return this.configureDonationForms.get('donations') as FormArray;
  }

  getCurrentEmployee(): void {
    this.employeeService.getCurrentEmployee().subscribe({
      next: (response) => {
        console.log('Current Employee Response : ', response);
        this.employeeId = response.employeeId;
        this.basicSalary = response.basicSalary;
        this.configureDonationForms.get('basicSalary')?.setValue(response.basicSalary);
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error('Error fetching current employee:', error);
      },
    });
  }

  // private initializeDonationForms(): void {
  //   this.donationWorkflowItems.forEach((item) => {
  //     const donationForm = this.fb.group({
  //       hospitalId: [item.hospitalId],
  //       hospitalName: [item.hospitalName],
  //       donationPlanId: [item.donationPlanId],
  //       donationName: [item.donationName],
  //       donationAmount: [
  //         '',
  //         [Validators.required, Validators.min(500), Validators.pattern(/^[0-9]+$/)],
  //       ],
  //       donationType: [DonationType.ONE_TIME],
  //       donationStartDate: [new Date().toISOString().substring(0, 10)],
  //       donationEndDate: [''],
  //       description: [''],
  //     });
  //     donationForm.get('donationType')?.valueChanges.subscribe((value) => {
  //       if (value === DonationType.RECURRING) {
  //         donationForm.get('donationStartDate')?.setValue('');
  //         donationForm.get('donationStartDate')?.setValidators([Validators.required]);
  //         donationForm.get('donationStartDate')?.updateValueAndValidity();
  //         // donationForm.get('donationEndDate')?.setValidators([Validators.required]);
  //       } else {
  //         donationForm
  //           .get('donationStartDate')
  //           ?.setValue(new Date().toISOString().substring(0, 10));
  //         donationForm.get('donationStartDate')?.clearValidators();
  //         donationForm.get('donationEndDate')?.setValue(null);
  //         donationForm.get('donationStartDate')?.updateValueAndValidity();
  //       }
  //     });

  //     this.donations.push(donationForm);
  //   });
  // }

private initializeDonationForms(): void {

  this.donationWorkflowItems.forEach((item) => {

    const donationType =
      item.donationType ?? DonationType.ONE_TIME;

    const donationForm = this.fb.group({

      hospitalId: [item.hospitalId],

      hospitalName: [item.hospitalName],

      donationPlanId: [item.donationPlanId],

      donationName: [item.donationName],

      donationAmount: [
        item.donationAmount ?? '',
        [
          Validators.required,
          Validators.min(500),
          Validators.pattern(/^[0-9]+$/)
        ]
      ],

      donationType: [donationType],

      donationStartDate: [
        item.donationStartDate ??
        new Date().toISOString().substring(0, 10)
      ],

      donationEndDate: [
        item.donationEndDate ?? null
      ],

      description: [''],

    });

    // Configure initial validation state
    if (donationType === DonationType.RECURRING) {

      donationForm
        .get('donationStartDate')
        ?.setValidators([Validators.required]);

    } else {

      donationForm
        .get('donationStartDate')
        ?.clearValidators();

    }

    donationForm
      .get('donationStartDate')
      ?.updateValueAndValidity();

    // Listen for future user changes
    donationForm
      .get('donationType')
      ?.valueChanges
      .subscribe((value) => {

        if (value === DonationType.RECURRING) {

          donationForm
            .get('donationStartDate')
            ?.setValue('');

          donationForm
            .get('donationStartDate')
            ?.setValidators([Validators.required]);

        } else {

          donationForm
            .get('donationStartDate')
            ?.setValue(
              new Date().toISOString().substring(0, 10)
            );

          donationForm
            .get('donationStartDate')
            ?.clearValidators();

          donationForm
            .get('donationEndDate')
            ?.setValue(null);
        }

        donationForm
          .get('donationStartDate')
          ?.updateValueAndValidity();

      });

    this.donations.push(donationForm);

  });
}

  isDonationTypeRecurring(index: number): boolean {
    const donationForm = this.donations.at(index);
    if (donationForm.get('donationType')?.value === DonationType.RECURRING) {
      // console.log('Inside if block', this.donations.at(0).get('donationType')?.value);
      return true;
    }
    // console.log(this.donations.at(0).get('donationType')?.value);
    return false;
  }

  private donationSalaryValidator(control: AbstractControl): ValidationErrors | null {
    const basicSalary = control.get('basicSalary')?.value;

    if (!basicSalary) {
      console.log('Basic Salary is not available');
      return null;
    }
    const donations = control.get('donations') as FormArray;
    // const donationsFormArray = this.configureDonationForms.get('donations') as FormArray;
    let donationAmount = 0;
    for (let i = 0; i < donations.length; i++) {
      donationAmount += Number(donations.at(i).get('donationAmount')?.value);
    }
    if (donationAmount + 5000 >= basicSalary) {
      console.log('Error', this.configureDonationForms.errors, ' ', donationAmount);
      return { insufficientRemainingSalary: true };
    }
    return null;
  }

  // goToNextStep(): void {
  //   if (this.configureDonationForms.invalid) {
  //     return;
  //   }

  //   const donationRequests: DonationRequest[] = this.donations.controls.map((donation) => {
  //     // create DonationRequest here
  //     const donationRequest: DonationRequest = {
  //       employeeId: this.employeeId,
  //       donationPlanId: donation.get('donationPlanId')?.value,
  //       donationType: donation.get('donationType')?.value,
  //       donationAmount: Number(donation.get('donationAmount')?.value),
  //       donationStartDate: donation.get('donationStartDate')?.value,
  //       donationEndDate: donation.get('donationEndDate')?.value || null,
  //     };
  //     return donationRequest;

  //   });
  //   console.log("Donation Requests : ", donationRequests);
  //   this.donationsConfigured.emit(donationRequests);

  //   this.cdr.detectChanges();
  // }
  goToNextStep(): void {
    if (this.configureDonationForms.invalid) {
      return;
    }

    const configuredItems: DonationWorkflowItem[] = this.donationWorkflowItems.map(
      (item, index) => {
        const donation = this.donations.at(index);

        return {
          ...item,
          donationAmount: Number(donation.get('donationAmount')?.value),
          donationType: donation.get('donationType')?.value,
          donationStartDate: donation.get('donationStartDate')?.value,
          donationEndDate: donation.get('donationEndDate')?.value || null,
        };
      },
    );

    console.log('Configured Donation Workflow Items:', configuredItems);

    this.donationsConfigured.emit(configuredItems);
  }
  goToPreviousStep(): void {
    this.previousRequested.emit();

    this.cdr.detectChanges();
  }
}
