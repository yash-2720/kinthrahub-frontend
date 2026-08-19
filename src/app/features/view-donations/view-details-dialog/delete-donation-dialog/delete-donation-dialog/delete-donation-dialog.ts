import { Component, ChangeDetectorRef, Inject, type OnInit } from '@angular/core';
import { DonationRequestService } from '../../../../donation-request/donation-request.service';
import  { SnackbarService } from '../../../../../shared/services/snackbar.service';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-delete-donation-dialog',
  imports: [MatDialogModule, MatButton],
  templateUrl: './delete-donation-dialog.html',
  styleUrl: './delete-donation-dialog.css',
})
export class DeleteDonationDialog  {
  constructor(
    private donationRequestService: DonationRequestService,
    private cdr: ChangeDetectorRef,
    @Inject(MAT_DIALOG_DATA) public data: { donationRequestId: string },
    private snackbar : SnackbarService,
    private dialogRef: MatDialogRef<DeleteDonationDialog>,
  ) {}

  

  deleteDonation(donationRequestId : string):void {
    this.donationRequestService.cancelDonationRequest(donationRequestId).subscribe({next :()=>{
      this.snackbar.success("Donation Request Cancelled Successfully ");
      this.dialogRef.close(true);
      console.log("Donation Request deleted");
    },
  error : (error)=>{
    console.log("Error Donation Request");
    this.snackbar.error('Failed to delete Donation request.');
  }})

  }
}
