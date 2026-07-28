import { Component, ChangeDetectorRef, Inject,  OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { EmployeeService } from '../../employee.service';
import type { EmployeeResponse } from '../../employee-response.model';

@Component({
  selector: 'app-employee-view-dialog',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule],
  templateUrl: './employee-view-dialog.html',
  styleUrl: './employee-view-dialog.css',
})
export class EmployeeViewDialog implements OnInit {
  
  // employeeData: any;
  employeeData: EmployeeResponse | null = null;

  constructor(private employeeService: EmployeeService, 
    private cdr: ChangeDetectorRef,
    @Inject(MAT_DIALOG_DATA) public data: { employeeId: string }){}

    ngOnInit(): void {
    // Automatically fetch details when the dialog opens
    if (this.data && this.data.employeeId) {
      this.loadEmployeeDetails(this.data.employeeId);
      console.log('Employee ID:', this.data.employeeId);
    }
  }

  loadEmployeeDetails(employeeId: string): void {

    this.employeeService.getEmployeeById(employeeId).subscribe({
      next: (employee) => {
        this.employeeData = employee;
        console.log('Employee details:', employee);
        console.log('Employee Data: ', this.employeeData);
        this.cdr.detectChanges(); // Trigger change detection to update the view
      },
      error: (error) => {
        console.error('Error fetching employee details:', error);
      }
    })
  }
}
