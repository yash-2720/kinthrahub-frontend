import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { AuthenticationService } from '../../../core/services/authentication.service';
import { LoginRequest } from '../../../core/models/login-request';
import { TokenService } from '../../../core/services/token.service';
import { CanActivateFn, Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { SnackbarService } from '../../../shared/services/snackbar.service';

@Component({
  selector: 'app-login',
  imports: [
    ReactiveFormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
  ],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authenticationService: AuthenticationService,
    private tokenService: TokenService,
    private router: Router,
    private snackbar: SnackbarService,
  ) {
    this.loginForm = this.fb.group({
      username: [''],
      password: [''],
    });
  }

  printForm(): void {
    console.log(this.loginForm);
    console.log(this.loginForm.value);
  }

  login(): void {
    this.authenticationService.login(this.loginForm.value as LoginRequest).subscribe({
      next: (response) => {
        this.tokenService.saveToken(response.token);
        console.log('Jwt Token:', response.token);
        console.log(this.tokenService.getToken());
        this.redirectToDashboard();
      },
      error: (error) => {
        this.snackbar.error( error? error.message : 'Login failed. Please check your credentials and try again.');
        console.error('Login failedd:', error);
      },
    });
  }

  redirectToDashboard() {
    this.router.navigate(['/dashboard']);
  }
}
