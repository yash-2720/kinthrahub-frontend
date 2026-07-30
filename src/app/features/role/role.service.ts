import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import  { HttpClient } from '@angular/common/http';
import type { Observable } from 'rxjs';
import type { RoleResponse } from './models/role-response-model';

@Injectable({
  providedIn: 'root',
})
export class RoleService {
  private readonly ROLE_API = `${environment.apiUrl}/role`;
  constructor(private http: HttpClient) {}

  getActiveRoles():Observable<RoleResponse[]>{
    return this.http.get<RoleResponse[]>(`${this.ROLE_API}/getActiveRoles`)
  }
}
