import { HttpParams, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { EmployeeResponse } from './employee-response.model';
import { PageResponse } from '../../core/models/page-response.model';
import { Observable } from 'rxjs';
import type { EmployeeRequest } from './employee-request.model';
import type { UpdateEmployeeRequest } from './update-employee-request.model';
import type { CurrentEmployeeResponse } from './current-employee-response.model';

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

    searchEmployees(
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

    return this.http.get<PageResponse<EmployeeResponse>>(`${this.EMPLOYEE_API}/search`, {
      params,
    });

    
  }

  getEmployeeById(employeeId: string): Observable<EmployeeResponse> {
      return this.http.get<EmployeeResponse>(`${this.EMPLOYEE_API}/getById/${employeeId}`);
  }

  getCurrentEmployee():Observable<CurrentEmployeeResponse>{
    return this.http.get<CurrentEmployeeResponse>(`${this.EMPLOYEE_API}/getCurrentEmployee`);
  }

  softDeleteEmployee(employeeId: string): Observable<EmployeeResponse> {
    return this.http.delete<EmployeeResponse>(`${this.EMPLOYEE_API}/deleteEmployee/${employeeId}`);
  }

  addEmployee(employeeRequest: EmployeeRequest): Observable<EmployeeResponse> {
    return this.http.post<EmployeeResponse>(`${this.EMPLOYEE_API}/addEmployee`, employeeRequest);
  }

  updateEmployee(employeeId: string, employeeRequest: UpdateEmployeeRequest): Observable<EmployeeResponse> {
    return this.http.put<EmployeeResponse>(`${this.EMPLOYEE_API}/updateEmployee/${employeeId}`, employeeRequest);
  }
}
