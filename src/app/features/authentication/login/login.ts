import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { AuthenticationService } from '../../../core/services/authentication.service';
import { LoginRequest } from '../../../core/models/login-request';
import  { TokenService } from '../../../core/services/token.service';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {

  loginForm : FormGroup;

  constructor(private fb: FormBuilder, private authenticationService: AuthenticationService, private tokenService: TokenService) {
    this.loginForm = this.fb.group({
    username: [''],
    password: ['']
  })
  }

  printForm(): void{
    console.log(this.loginForm);
    console.log(this.loginForm.value);
  }

  login():void{
    this.authenticationService.login(this.loginForm.value as LoginRequest).subscribe({
      next: (response) => {
        this.tokenService.saveToken(response.token);
        console.log('Jwt Token:', response.token);
        console.log(this.tokenService.getToken());
      },
      error: (error) => {
        console.error('Login faileddd:', error);
      }
    });

  }


  
}
