import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import type { ApplicationUserResponse } from './models/application-user-response.model';
import type { PageResponse } from '../../core/models/page-response.model';
import { Observable } from 'rxjs/internal/Observable';
import type { ApplicationUserRequest } from './models/application-user-request.model';
// import type { UpdateApplicationUser } from './update-application-user-list/update-application-user/update-application-user';
import type { UpdateApplicationUserRequest } from './models/update-application-user-request.model';

@Injectable({
  providedIn: 'root',
})
export class ApplicationUserService {
  // createApplicationUser(request: ApplicationUserRequest) {
  //   throw new Error('Method not implemented.');
  // }
  private readonly APPUSER_API = `${environment.apiUrl}/applicationUser`;
  constructor(private http: HttpClient) {}

  getAllApplicationUsers(
  page: number,
  size: number,
  sortOrder: string,
  isActive: boolean
): Observable<PageResponse<ApplicationUserResponse>> {
  const params = new HttpParams()
      .set('page', page)
      .set('size', size)
      .set('sortDirection', sortOrder)
      .set('isActive', isActive);

  return this.http.get<PageResponse<ApplicationUserResponse>>(
    `${this.APPUSER_API}/getAllApplicationUsers`,
    {
      params
    }
  );
}

searchApplicationUsers(
  page: number,
  size: number,
  sortOrder: string,
  isActive: boolean,
  search: string
): Observable<PageResponse<ApplicationUserResponse>> {
  const params = new HttpParams()
      .set('page', page)
      .set('size', size)
      .set('sortDirection', sortOrder)
      .set('search',search)
      .set('isActive', isActive);

  return this.http.get<PageResponse<ApplicationUserResponse>>(
    `${this.APPUSER_API}/search`,
    {
      params
    }
  );

  
}

getAppUserById(appUserId : string): Observable<ApplicationUserResponse>{
    return this.http.get<ApplicationUserResponse>(`${this.APPUSER_API}/getUserById/${appUserId}`);
  }

updateApplicationUser(appUserId : string, request : UpdateApplicationUserRequest):Observable<ApplicationUserResponse>{
  return this.http.put<ApplicationUserResponse>(`${this.APPUSER_API}/updateApplicationUser/${appUserId}`, request);
}
deleteApplicationUser(appUserId: string): Observable<ApplicationUserResponse> {
    return this.http.delete<ApplicationUserResponse>(`${this.APPUSER_API}/deleteApplicationUser/${appUserId}`);
}
// addEmployee(employeeRequest: EmployeeRequest): Observable<EmployeeResponse> {
//     return this.http.post<EmployeeResponse>(`${this.EMPLOYEE_API}/addEmployee`, employeeRequest);
//   }

createApplicationUser(request : ApplicationUserRequest) : Observable<ApplicationUserResponse>{
  return this.http.post<ApplicationUserResponse>(`${this.APPUSER_API}/addNewUser`,request);
}
}
