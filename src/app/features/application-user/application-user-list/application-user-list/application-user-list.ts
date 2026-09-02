import { Component, ChangeDetectorRef, type OnInit } from '@angular/core';
import { ApplicationUserService } from '../../application-user.service';
import type { ApplicationUserResponse } from '../../models/application-user-response.model';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialog } from '@angular/material/dialog';
import { MatListModule } from '@angular/material/list';
import { MatPaginatorModule, type PageEvent } from '@angular/material/paginator';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ApplicationUserViewDialog } from '../../components/application-user-view-dialog/application-user-view-dialog';
// import { UpdateApplicationUser } from '../../update-application-user-list/update-application-user/update-application-user';
import { UpdateApplicationUserDialog } from '../../update-application-user-list/update-application-user/update-application-user-dialog';
import { ApplicationUserDeleteDialog } from '../../components/application-user-delete-dialog/application-user-delete-dialog/application-user-delete-dialog';
import  { SnackbarService } from '../../../../shared/services/snackbar.service';
@Component({
  selector: 'app-application-user-list',
  imports: [
    CommonModule,
    MatToolbarModule,
    MatSidenavModule,
    MatButtonModule,
    MatListModule,
    MatTableModule,
    MatPaginatorModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatTooltipModule,
    FormsModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './application-user-list.html',
  styleUrl: './application-user-list.css',
})
export class ApplicationUserList implements OnInit {
  constructor(
    private appUserService: ApplicationUserService,
    private cdr: ChangeDetectorRef,
    private dialog: MatDialog,
    private snackbar : SnackbarService
  ) {}

  appUsers: ApplicationUserResponse[] = [];

  isLoading = false;

  totalElements = 0;
  page = 0;
  size = 5;
  search = '';
  sortOrder = 'asc';
  active = true;

  displayedColumns: string[] = [
    'userId',
    'username',
    'employeeId',
    'employeeName',
    'roleName',
    'actions',
  ];
  ngOnInit(): void {
    console.log('app user ng on in it');
    this.loadAppUsers();
    console.log(this.appUsers);
  }

  loadAppUsers() {
    this.isLoading = true;
    const request = this.search.trim()
      ? this.appUserService.searchApplicationUsers(
          this.page,
          this.size,
          this.sortOrder,
          this.active,
          this.search,
        )
      : this.appUserService.getAllApplicationUsers(
          this.page,
          this.size,
          this.sortOrder,
          this.active,
        );
    request.subscribe({
      next: (response) => {
        // console.log(response);
        // console.log(response.content);
        this.appUsers = response.content;
        this.totalElements = response.totalElements;
        this.isLoading = false;
        this.cdr.detectChanges();
      },
      error: (error) => {
        this.snackbar.error( error? error.message : 'Error loading application users.');
        console.error(error);
      },
    });
  }

  onSearch() {
    this.page = 0;
    this.loadAppUsers();
  }

  onPageChange(event: PageEvent): void {
    this.page = event.pageIndex;
    this.size = event.pageSize;
    this.loadAppUsers();
  }

  openViewDialog(userId: string): void {
    const dialogRef = this.dialog.open(ApplicationUserViewDialog, {
      width: '600px',
      data: { userId },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.loadAppUsers();
      }
    });
  }
  openEditAppUser(userId: string): void {
    const dialogRef = this.dialog.open(UpdateApplicationUserDialog, {
      width: '750px',
      maxWidth: '90vw',
      disableClose: true,
      data: {
        userId: userId,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.loadAppUsers();
      }
    });
  }

  openDeleteDialog(userId: string): void {
    const dialogRef = this.dialog.open(ApplicationUserDeleteDialog, {
      width: '750px',
      maxWidth: '90vw',
      disableClose: true,
      data: {
        userId: userId,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.loadAppUsers();
      }
    });
  }
}
