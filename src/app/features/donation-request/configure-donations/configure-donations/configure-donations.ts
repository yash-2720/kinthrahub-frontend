import { Component, Input,  OnInit } from '@angular/core';
import  { DonationWorkflowItem } from '../../models/donation-workflow-item';
import  { FormBuilder, FormGroup, ReactiveFormsModule, Validators, type FormArray } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DonationType } from '../../enums/donation-type.enum';
import {MatRadioModule} from '@angular/material/radio';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

@Component({
  selector: 'app-configure-donations',
  imports: [ReactiveFormsModule, CommonModule, MatRadioModule,MatDatepickerModule, MatNativeDateModule  ],
  templateUrl: './configure-donations.html',
  styleUrl: './configure-donations.css',
})
export class ConfigureDonations implements OnInit {
DonationType = DonationType ;
  constructor(private fb : FormBuilder){}

  @Input()
  donationWorkflowItems : DonationWorkflowItem[] = [];

  configureDonationForms! : FormGroup;

  ngOnInit(): void {
    console.log("From child component : ",this.donationWorkflowItems);

      this.configureDonationForms = this.fb.group({

        donations:this.fb.array([])
        
      });
      this.initializeDonationForms();
      console.log("Donations Length : " ,this.donations.length) ;
      console.log("Donations :" ,this.donations);
  }

  get donations(): FormArray{
    return this.configureDonationForms.get('donations') as FormArray;
  }

  private initializeDonationForms():void{
    this.donationWorkflowItems.forEach((item => {
      const donationForm = this.fb.group({
        hospitalId : [item.hospitalId],
        hospitalName : [item.hospitalName],
        donationPlanId : [item.donationPlanId],
        donationName : [item.donationName],
        donationAmount : ['',[Validators.required, Validators.min(500), Validators.pattern(/^[0-9]+$/)]],
        donationType : [DonationType.RECURRING],
        donationStartDate : [''],
        donationEndDate : [''],
        description : ['']
      });
      donationForm.get('donationType')?.valueChanges.subscribe((value) => {
        if(value === DonationType.RECURRING) {
          donationForm.get('donationStartDate')?.setValidators([Validators.required]);
          donationForm.get('donationStartDate')?.updateValueAndValidity();
          // donationForm.get('donationEndDate')?.setValidators([Validators.required]);
        }else{

          donationForm.get('donationStartDate')?.clearValidators();
          donationForm.get('donationStartDate')?.setValue('');
          donationForm.get('donationEndDate')?.setValue(null);
          donationForm.get('donationStartDate')?.updateValueAndValidity();

        }});

      this.donations.push(donationForm);
    } ))
  }
  
  isDonationTypeRecurring(index: number): boolean {
    const donationForm = this.donations.at(index);
    if(donationForm.get('donationType')?.value === DonationType.RECURRING){
      console.log("Inside if block",this.donations.at(0).get('donationType')?.value)
      return true;
    }
    console.log(this.donations.at(0).get('donationType')?.value)
    return false;
  }

 
}
