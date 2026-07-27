import { Component, ChangeDetectorRef, OnInit } from '@angular/core';
import {
  MatDialog,
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
} from '@angular/material/dialog';
import { EmployeeService } from '../../employee.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormField, MatLabel, MatError } from '@angular/material/select';
import { EmployeeDeleteDialog } from '../../components/employee-delete-dialog/employee-delete-dialog';
import { EmployeeRequest } from '../../employee-request.model';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { SnackbarService } from '../../../../shared/services/snackbar.service';

@Component({
  selector: 'app-employee-form',
  imports: [
    ReactiveFormsModule,
    MatFormField,
    MatLabel,
    MatError,
    MatDialogActions,
    MatDialogContent,
    MatInputModule,
    CommonModule,
  ],
  templateUrl: './employee-form.html',
  styleUrl: './employee-form.css',
})
export class EmployeeForm implements OnInit {
  employeeForm!: FormGroup;

  constructor(
    private employeeService: EmployeeService,
    private cdr: ChangeDetectorRef,
    private dialog: MatDialog,
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<EmployeeDeleteDialog>,
    private snackbar: SnackbarService
  ) {}

  ngOnInit(): void {
    this.employeeForm = this.fb.group({
      employeeNumber: ['', Validators.required],
      employeeName: ['', Validators.required],
      employeeEmail: ['', [Validators.required, Validators.email]],
      employeePhoneNumber: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      basicSalary: ['', [Validators.required, Validators.min(1000)]],
    });
  }

  onCancel() {
   this.dialogRef.close(); // Close the dialog without saving
  }
  onSubmit(): void {
  if (this.employeeForm.invalid) {
    this.employeeForm.markAllAsTouched();
    return;
  }

  const employeeRequest: EmployeeRequest = this.employeeForm.value;

  this.employeeService.addEmployee(employeeRequest).subscribe({
    next: (response) => {
      this.snackbar.success('Employee added successfully.');
      this.dialogRef.close(true);
    },
    error: (error) => {
      console.error('Error adding employee:', error);
      this.snackbar.error('Failed to add employee.');
    }
  });
}
}
