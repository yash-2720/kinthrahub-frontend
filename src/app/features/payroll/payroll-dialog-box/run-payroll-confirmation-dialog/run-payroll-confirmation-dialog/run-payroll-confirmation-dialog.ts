import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-run-payroll-confirmation-dialog',
  imports: [MatDialogModule,
    MatButtonModule,],
  templateUrl: './run-payroll-confirmation-dialog.html',
  styleUrl: './run-payroll-confirmation-dialog.css',
})
export class RunPayrollConfirmationDialog {
  constructor(
    private dialogRef: MatDialogRef<RunPayrollConfirmationDialog>,

    @Inject(MAT_DIALOG_DATA)
    public data: {
      payrollMonth: number;
      payrollYear: number;
    },
  ) {}

  confirm(): void {
    this.dialogRef.close(true);
  }

  cancel(): void {
    this.dialogRef.close(false);
  }
}
