import { Component, ChangeDetectorRef, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { EmployeeService } from '../../employee.service';
import  { EmployeeResponse } from '../../employee-response.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import  { EmployeeList } from '../../employee-list/employee-list/employee-list';
import  { SnackbarService } from '../../../../shared/services/snackbar.service';

@Component({
  selector: 'app-employee-delete-dialog',
  imports: [MatDialogModule, MatButtonModule],
  templateUrl: './employee-delete-dialog.html',
  styleUrl: './employee-delete-dialog.css',
})
export class EmployeeDeleteDialog {
  // employeeData: EmployeeResponse ;
  constructor(
    private employeeService: EmployeeService,
    private cdr: ChangeDetectorRef,
    private dialogRef: MatDialogRef<EmployeeDeleteDialog>,
    private snackbar: SnackbarService,
    @Inject(MAT_DIALOG_DATA) public data: { employeeId: string },

  ) {}

  deleteEmployee(employeeId: string): void {
    this.employeeService.softDeleteEmployee(employeeId).subscribe({
      next: () => {
        this.snackbar.success('Employee deleted successfully.');
       
        this.dialogRef.close(true); // Close the dialog and pass true to indicate successful deletion
      },
      error: (error: any) => {
        console.error('Error deleting employee:', error);
        this.snackbar.error('Failed to delete employee.');
      },
    });
  }
}
