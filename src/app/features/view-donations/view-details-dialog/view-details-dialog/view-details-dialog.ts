import { Component,  ChangeDetectorRef, Inject, type OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import  { DonationRequestService } from '../../../donation-request/donation-request.service';
import type { DonationRequestResponse } from '../../../donation-request/models/donation-request-response';

@Component({
  selector: 'app-view-details-dialog',
  imports: [MatDialogModule, MatButtonModule],
  templateUrl: './view-details-dialog.html',
  styleUrl: './view-details-dialog.css',
})
export class ViewDetailsDialog implements OnInit{

  donationRequest: DonationRequestResponse | null= null;

  constructor(private donationRequestService : DonationRequestService ,private cdr : ChangeDetectorRef,
    @Inject(MAT_DIALOG_DATA) public data: { donationRequestId: string }
  ){}

  ngOnInit(): void {
    if(this.data && this.data.donationRequestId){
      this.loadDonationRequest(this.data.donationRequestId);
      this.cdr.detectChanges();
    }
  }

  loadDonationRequest(donationRequestId : string): void{
    this.donationRequestService.getDonationRequestById(donationRequestId).subscribe({
      next : (response) =>{
        this.donationRequest = response;
        console.log("Donation Request : ", this.donationRequest);
        this.cdr.detectChanges();

      },
      error :(error)=>{
        console.log("Error");
      }
    })
  }
}
