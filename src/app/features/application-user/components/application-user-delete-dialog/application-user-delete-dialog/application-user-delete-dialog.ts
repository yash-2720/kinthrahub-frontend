import { Component, ChangeDetectorRef, type OnInit, Inject } from '@angular/core';
import { ApplicationUserService } from '../../../application-user.service';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogContent, MatDialogActions, MatDialogModule } from '@angular/material/dialog';
import { SnackbarService } from '../../../../../shared/services/snackbar.service';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-application-user-delete-dialog',
  imports: [MatDialogContent, MatDialogActions,  MatDialogModule,
  MatButtonModule],
  templateUrl: './application-user-delete-dialog.html',
  styleUrl: './application-user-delete-dialog.css',
})
export class ApplicationUserDeleteDialog  {
  constructor(
    private appUserService: ApplicationUserService,
    private cdr: ChangeDetectorRef,
    private dialogRef: MatDialogRef<ApplicationUserDeleteDialog>,
    private snackbar: SnackbarService,
    @Inject(MAT_DIALOG_DATA) public data: { userId: string }
  ) {}

 isDeleting = false;

deleteAppUser(userId: string): void {

    this.isDeleting = true;

    this.appUserService.deleteApplicationUser(userId).subscribe({
        next: () => {
            this.snackbar.success("Application User Deleted Successfully");
            this.dialogRef.close(true);
        },
        error: (error) => {
            this.isDeleting = false;
            this.snackbar.error(error.error?.message);
        }
    });
}

  
}
