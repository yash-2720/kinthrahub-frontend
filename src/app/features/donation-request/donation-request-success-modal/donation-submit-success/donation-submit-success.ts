import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-donation-submit-success',
  imports: [
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './donation-submit-success.html',
  styleUrl: './donation-submit-success.css',
})
export class DonationSubmitSuccess {

  constructor(
    private dialogRef: MatDialogRef<DonationSubmitSuccess>
  ) {}

  close(): void {
    this.dialogRef.close();
  }
}