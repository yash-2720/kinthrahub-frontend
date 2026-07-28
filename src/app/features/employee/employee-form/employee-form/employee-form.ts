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
import { Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { finalize } from 'rxjs';

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
  mode: 'add' | 'edit' = 'add';
  employeeId?: string;
  isSubmitting = false;

  constructor(
    private employeeService: EmployeeService,
    private cdr: ChangeDetectorRef,
    private dialog: MatDialog,
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<EmployeeForm>,
    private snackbar: SnackbarService,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      mode: 'add' | 'edit';
      employeeId?: string;
    },
  ) {}

  ngOnInit(): void {
    this.mode = this.data.mode;
    this.employeeId = this.data.employeeId;
    if (this.mode === 'edit' && this.employeeId) {
      this.loadEmployee();
    }
    this.employeeForm = this.fb.group({
      employeeNumber: ['', Validators.required],
      employeeName: ['', Validators.required],
      employeeEmail: ['', [Validators.required, Validators.email]],
      employeePhoneNumber: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      basicSalary: ['', [Validators.required, Validators.min(1000)]],
    });
  }

  loadEmployee(): void {
    this.employeeService.getEmployeeById(this.employeeId!).subscribe({
      next: (employee) => {
        this.employeeForm.patchValue({
          employeeNumber: employee.employeeNumber,
          employeeName: employee.employeeName,
          employeeEmail: employee.employeeEmail,
          employeePhoneNumber: employee.employeePhoneNumber,
          basicSalary: employee.basicSalary,
        });
        this.employeeForm.get('employeeNumber')?.disable();
        this.employeeForm.get('basicSalary')?.disable();
      },
      error: (error) => {
        console.error('Error loading employee:', error);
        this.snackbar.error('Failed to load employee details.');
        this.dialogRef.close();
      },
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
    this.isSubmitting = true;

    const employeeRequest: EmployeeRequest = this.employeeForm.getRawValue();

    const updateRequest = {
      employeeName: this.employeeForm.get('employeeName')?.value,
      employeeEmail: this.employeeForm.get('employeeEmail')?.value,
      employeePhoneNumber: this.employeeForm.get('employeePhoneNumber')?.value,
    };
    if (this.mode === 'add') {
      this.employeeService
        .addEmployee(employeeRequest)
        .pipe(finalize(() => (this.isSubmitting = false)))
        .subscribe({
          next: (response) => {
            this.snackbar.success('Employee added successfully.');
            this.dialogRef.close(true);
          },
          error: (error) => {
            this.isSubmitting = false;
            console.error('Error adding employee:', error);
            this.snackbar.error('Failed to add employee.');
          },
        });
    } else {
      this.employeeService.updateEmployee(this.employeeId!, updateRequest).pipe(
        finalize(() => this.isSubmitting = false)
      ).subscribe({
        next: (response) => {
          this.snackbar.success('Employee updated successfully.');
          this.dialogRef.close(true);
        },
        error: (error) => {
          this.isSubmitting = false;
          console.error('Error updating employee:', error);
          this.snackbar.error('Failed to update employee.');
        },
      });
    }
  }
}
