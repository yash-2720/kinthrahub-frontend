import { Component, ChangeDetectorRef, type OnInit, Inject } from '@angular/core';
import { ApplicationUserService } from '../../application-user.service';
import { Observable } from 'rxjs';
import { RoleService } from '../../../role/role.service';
import type { RoleResponse } from '../../../role/models/role-response-model';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import type { ApplicationUserResponse } from '../../models/application-user-response.model';
import {
  MatFormField,
  MatLabel,
  MatSelect,
  MatOption,
  MatSelectModule,
} from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { UpdateApplicationUserRequest } from '../../models/update-application-user-request.model';
import  { SnackbarService } from '../../../../shared/services/snackbar.service';

@Component({
  selector: 'app-update-application-user',
  imports: [
    MatFormField,
    MatLabel,
    MatSelect,
    MatOption,
    MatDialogActions,
    CommonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './update-application-user.html',
  styleUrl: './update-application-user.css',
})
export class UpdateApplicationUserDialog implements OnInit {
  constructor(
    private cdr: ChangeDetectorRef,
    private appUserService: ApplicationUserService,
    private roleService: RoleService,
    private snackbarService : SnackbarService,
    @Inject(MAT_DIALOG_DATA) public data: { userId: string },
    private dialogRef: MatDialogRef<UpdateApplicationUserRequest>,
  ) {}

  roles: RoleResponse[] = [];
  originalRoleId = '';
  appUserData: ApplicationUserResponse | null = null;
  ngOnInit(): void {
    this.loadActiveRoles();
    this.loadAppUser(this.data.userId);
  }

  loadAppUser(userId: string): void {
    this.appUserService.getAppUserById(userId).subscribe({
      next: (appUser) => {
        this.appUserData = appUser;
        this.originalRoleId = appUser.roleId;
        console.log(this.appUserData);
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.log('Error : ' + error);
        this.snackbarService.error(error);
      },
    });
  }
  loadActiveRoles(): void {
    this.roleService.getActiveRoles().subscribe({
      next: (roles) => {
        this.roles = roles;
        console.log(roles);
        this.cdr.detectChanges();
        // this.dialogRef.close(true);
      },
      error: (error) => {
        console.log('Error : ' + error);
        this.snackbarService.error(error);
      },
    });
  }

  updateApplicationUser(): void {
    if (!this.appUserData) {
      return;
    }

    const request: UpdateApplicationUserRequest = {
      roleId: this.appUserData.roleId,
    };

    this.appUserService.updateApplicationUser(this.appUserData.userId, request).subscribe({
      next: (response) => {
        console.log(response);
        this.snackbarService.success('Application User updated successfully.');
        this.dialogRef.close(true);
      },
      error: (error) => {
        console.error(error);
        this.snackbarService.error(error);
      },
    });
  }
}
