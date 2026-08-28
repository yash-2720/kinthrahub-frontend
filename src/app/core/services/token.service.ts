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

    getRole(): string | null {

    const token = this.getToken();

    if (!token) {
      return null;
    }

    try {

      const payload = token.split('.')[1];

      const decodedPayload = JSON.parse(atob(payload));

      return decodedPayload.role ?? null;

    } catch (error) {

      console.error('Unable to decode JWT:', error);

      return null;
    }
  }
}
