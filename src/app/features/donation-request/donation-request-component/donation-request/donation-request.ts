import { Component,  ChangeDetectorRef} from '@angular/core';
import type { DonationWorkflowItem } from '../../models/donation-workflow-item';
import { SelectDonationPlans } from "../../select-donation-plans/select-donation-plans";
import { CommonModule } from '@angular/common';
// import { DonationWorkFlowItem};

@Component({
  selector: 'app-donation-request',
  imports: [SelectDonationPlans, CommonModule],
  templateUrl: './donation-request.html',
  styleUrl: './donation-request.css',
})
export class DonationRequest {
  constructor(private cdr: ChangeDetectorRef) {}

  currentSteps = 0;
  donationWorkflowItems :  DonationWorkflowItem[] = [];
 
  goToNextStep():void{
    this.currentSteps++;
    this.cdr.detectChanges();
    
  }
  goToPreviousStep():void{
    this.currentSteps--;
    this.cdr.detectChanges();
  }

  onPlansSelected(items: DonationWorkflowItem[]):void{
    // alert("Parent received event");
    console.log("From parent component : ",items);
    this.donationWorkflowItems = items;
    this.goToNextStep();
  }

 
}
