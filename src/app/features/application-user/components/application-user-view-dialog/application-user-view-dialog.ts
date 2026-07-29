import { Component, ChangeDetectorRef, Inject, type OnInit } from '@angular/core';
import { ApplicationUserRequest } from '../../models/application-user-request.model';
import { ApplicationUserResponse } from '../../models/application-user-response.model';
import { ApplicationUserService } from '../../application-user.service';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import type { Observable } from 'rxjs';
import { MatProgressSpinner } from "@angular/material/progress-spinner";

@Component({
  selector: 'app-application-user-view-dialog',
  imports: [MatDialogModule, MatButtonModule, MatProgressSpinner],
  templateUrl: './application-user-view-dialog.html',
  styleUrl: './application-user-view-dialog.css',
})
export class ApplicationUserViewDialog implements OnInit {
  appUserData: ApplicationUserResponse | null = null;

  constructor(
    private appUserService: ApplicationUserService,
    private cdr: ChangeDetectorRef,
    @Inject(MAT_DIALOG_DATA) public data: { userId: string },
  ) {}

  ngOnInit(): void {
    if (this.data && this.data.userId) {
      this.loadAppUserDetails(this.data.userId);
      console.log('User ID:', this.data.userId);
    }
  }

  loadAppUserDetails(userId : string) : void{
    this.appUserService.getAppUserById(userId). subscribe({
      next : (appUser) => {
        this.appUserData = appUser,
        console.log(this.appUserData)
        this.cdr.detectChanges()
      },
      error:(error) => {
        console.log(error);
      }
    })
  }
  
}
