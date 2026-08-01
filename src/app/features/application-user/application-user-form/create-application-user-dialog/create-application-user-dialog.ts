import { Component, Inject, ChangeDetectorRef, type OnInit } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
} from '@angular/material/dialog';
import { EmployeeResponse } from '../../../employee/employee-response.model';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';

import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';

import { SnackbarService } from '../../../../shared/services/snackbar.service';
import { RoleService } from '../../../role/role.service';
import { RoleResponse } from '../../../role/models/role-response-model';
import { ApplicationUserService } from '../../application-user.service';
import { ApplicationUserRequest } from '../../models/application-user-request.model';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-create-application-user-dialog',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogActions,
    MatDialogContent,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './create-application-user-dialog.html',
  styleUrl: './create-application-user-dialog.css',
})
export class CreateApplicationUserDialog implements OnInit {
  createUserForm!: FormGroup;
  roles: RoleResponse[] = [];
  isLoading = false;
  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<CreateApplicationUserDialog>,
    private snackbar: SnackbarService,
    private roleService: RoleService,
    private appUserService: ApplicationUserService,
    private cdr: ChangeDetectorRef,
    @Inject(MAT_DIALOG_DATA) public data: EmployeeResponse,
  ) {}

  ngOnInit(): void {
    this.createUserForm = this.fb.group({
      username: ['', Validators.required],
      roleId: ['', Validators.required],
      password: ['', Validators.required],
    });

    this.loadActiveRoles();
  }

  loadActiveRoles(): void {
    this.roleService.getActiveRoles().subscribe({
      next: (response) => {
        this.roles = response;
      },
      error: (error) => {
        this.snackbar.error('Unable to load roles.');
      },
    });
  }

  createApplicationUser(): void {
    if (this.createUserForm.invalid) {
      this.createUserForm.markAllAsTouched();
      return;
    }

    console.log(this.createUserForm.getRawValue());

    const formValue = this.createUserForm.getRawValue();

    const request: ApplicationUserRequest = {
      employeeId: this.data.employeeId,
      roleId: formValue.roleId,
      username: formValue.username,
      password: formValue.password,
    };
    this.isLoading = true;
this.appUserService
  .createApplicationUser(request)
  .pipe(
    finalize(() => {
      this.isLoading = false;
      this.cdr.detectChanges(); // <-- moved here, runs after isLoading is false
    }),
  )
  .subscribe({
    next: () => {
      this.snackbar.success('Application user added successfully');
      this.dialogRef.close(true);
    },
    error: (error) => {
      this.snackbar.error(error.error?.message);
      // no detectChanges here — finalize handles it
    },
  });
  }
  onCancel() {
    this.dialogRef.close(); // Close the dialog without saving
  }
}
