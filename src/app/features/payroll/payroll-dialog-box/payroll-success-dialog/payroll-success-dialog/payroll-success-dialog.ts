import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { PayrollResponse } from '../../../models/payroll-response';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-payroll-success-dialog',
  imports: [MatDialogModule, MatButtonModule],
  templateUrl: './payroll-success-dialog.html',
  styleUrl: './payroll-success-dialog.css',
})
export class PayrollSuccessDialog {
  constructor(
    private dialogRef: MatDialogRef<PayrollSuccessDialog>,
    @Inject(MAT_DIALOG_DATA) public data: PayrollResponse,
  ) {}

  close(): void {
    this.dialogRef.close();
  }
}
