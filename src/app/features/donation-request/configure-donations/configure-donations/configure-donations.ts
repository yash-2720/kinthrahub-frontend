import { Component, Input, OnInit,  ChangeDetectorRef } from '@angular/core';
import { DonationWorkflowItem } from '../../models/donation-workflow-item';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
  ValidationErrors,
  type AbstractControl,
  type FormArray,
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
    currentSteps = 1;
  constructor(
    private fb: FormBuilder,
    private employeeService: EmployeeService,
    private cdr: ChangeDetectorRef
  ) {}

  @Input()
  donationWorkflowItems: DonationWorkflowItem[] = [];

  configureDonationForms!: FormGroup;

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

  private initializeDonationForms(): void {
    this.donationWorkflowItems.forEach((item) => {
      const donationForm = this.fb.group({
        hospitalId: [item.hospitalId],
        hospitalName: [item.hospitalName],
        donationPlanId: [item.donationPlanId],
        donationName: [item.donationName],
        donationAmount: [
          '',
          [Validators.required, Validators.min(500), Validators.pattern(/^[0-9]+$/)],
        ],
        donationType: [DonationType.ONE_TIME],
        donationStartDate: [''],
        donationEndDate: [''],
        description: [''],
      });
      donationForm.get('donationType')?.valueChanges.subscribe((value) => {
        if (value === DonationType.RECURRING) {
          donationForm.get('donationStartDate')?.setValidators([Validators.required]);
          donationForm.get('donationStartDate')?.updateValueAndValidity();
          // donationForm.get('donationEndDate')?.setValidators([Validators.required]);
        } else {
          donationForm.get('donationStartDate')?.clearValidators();
          donationForm.get('donationStartDate')?.setValue('');
          donationForm.get('donationEndDate')?.setValue(null);
          donationForm.get('donationStartDate')?.updateValueAndValidity();
        }
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
      console.log('Error', this.configureDonationForms.errors,' ', donationAmount);
      return { insufficientRemainingSalary: true };
    }
    return null;
  }

    goToNextStep():void{
    this.currentSteps++;
    this.cdr.detectChanges();
    
  }
  goToPreviousStep():void{
    this.currentSteps--;
    this.cdr.detectChanges();
  }
}
