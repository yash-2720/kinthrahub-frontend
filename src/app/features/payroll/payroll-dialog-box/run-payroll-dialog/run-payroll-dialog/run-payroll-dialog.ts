import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-run-payroll-dialog',
  imports: [
    ReactiveFormsModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  templateUrl: './run-payroll-dialog.html',
  styleUrl: './run-payroll-dialog.css',
})
export class RunPayrollDialog {

  payrollForm;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<RunPayrollDialog>,
  ) {

    this.payrollForm = this.fb.group({
      payrollMonth: ['', [Validators.required]],
      payrollYear: ['', [Validators.required]],
    });

  }

  continue(): void {

    if (this.payrollForm.invalid) {
      this.payrollForm.markAllAsTouched();
      return;
    }

    console.log('Payroll Form:', this.payrollForm.value);

    this.dialogRef.close(this.payrollForm.value);
  }

  cancel(): void {
    this.dialogRef.close();
  }
}