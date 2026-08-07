import { Component, Input,  OnInit } from '@angular/core';
import  { DonationWorkflowItem } from '../../models/donation-workflow-item';
import  { FormBuilder, FormGroup, type FormArray } from '@angular/forms';

@Component({
  selector: 'app-configure-donations',
  imports: [],
  templateUrl: './configure-donations.html',
  styleUrl: './configure-donations.css',
})
export class ConfigureDonations implements OnInit {
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
        donationAmount : [''],
        donationType : [''],
        donationStartDate : [''],
        donationEndDate : [''],
        description : ['']
      });
      this.donations.push(donationForm);
    } ))
  }
  

}
