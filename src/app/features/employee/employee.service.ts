import { HttpParams, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { EmployeeResponse } from './employee-response.model';
import { PageResponse } from '../../core/models/page-response.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  private readonly EMPLOYEE_API = `${environment.apiUrl}/employee`;

  constructor(private http: HttpClient) {}

  getAllEmployees(
    page: number,
    size: number,
    search: string,
    isActive: boolean,
  ): Observable<PageResponse<EmployeeResponse>> {
    const params = new HttpParams()
      .set('page', page)
      .set('size', size)
      .set('search', search)
      .set('isActive', isActive);

    return this.http.get<PageResponse<EmployeeResponse>>(`${this.EMPLOYEE_API}/getAllEmployees`, {
      params,
    });
  }
}
