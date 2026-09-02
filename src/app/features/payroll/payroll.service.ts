import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import type { PayrollResponse } from './models/payroll-response';
import { Observable } from 'rxjs';
import type { PageResponse } from '../../core/models/page-response.model';
import type { PayrollRequest } from './models/payroll-request';

@Injectable({
  providedIn: 'root',
})
export class PayrollService {
  private readonly PAYROLL_API = `${environment.apiUrl}/payRollRun`;
  constructor(private http: HttpClient) {}

  getAllPayrollRecords(
    page: number,
    size: number
  ): Observable<PageResponse<PayrollResponse>> {
    const params = new HttpParams().set('page', page).set('size', size);
    return this.http.get<PageResponse<PayrollResponse>>(
      `${this.PAYROLL_API}/getAllPayroll`,
      {
        params,
      },
    );
  }
  searchPayrolls(
    page: number,
    size: number,
    search: string,
  ): Observable<PageResponse<PayrollResponse>> {
    const params = new HttpParams()
      .set('page', page)
      .set('size', size)
      .set('search', search);
    return this.http.get<PageResponse<PayrollResponse>>(
      `${this.PAYROLL_API}/search`,
      {
        params,
      },
    );
  }

  executePayroll(payrollRequest : PayrollRequest):Observable<PayrollResponse>{
    return this.http.post<PayrollResponse>(`${this.PAYROLL_API}/executePayroll`,payrollRequest);
  }

  getPayrollById(payrollRunId : string): Observable<PayrollResponse>{
    return this.http.get<PayrollResponse>(`${this.PAYROLL_API}/getPayrollById/${payrollRunId}`);
  }

  getLatestPayroll():Observable<PayrollResponse>{
    return this.http.get<PayrollResponse>(`${this.PAYROLL_API}/getLatestPayroll`);
  }
}
