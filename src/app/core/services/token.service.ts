import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TokenService {


  saveToken(token  : string): void {

    sessionStorage.setItem('token', token);

  }

  getToken(): string | null {
    return sessionStorage.getItem('token');
  }

  removeToken(): void {
    sessionStorage.removeItem('token');
  }

  isLoggedIn() : boolean{
    return this.getToken() !== null;
  }
}
