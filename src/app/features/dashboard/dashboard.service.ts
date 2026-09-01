import { Injectable } from '@angular/core';
import { DonationRequestService } from '../donation-request/donation-request.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import type { Observable } from 'rxjs';
import type { MyDonationSummaryResponse } from './model/MyDonationSummaryResponse';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  private readonly DASHBOARD_REQUEST_API = `${environment.apiUrl}/dashboard`;

  constructor(private http: HttpClient) {}

  getMyDonationSummary(): Observable<MyDonationSummaryResponse> {
    return this.http.get<MyDonationSummaryResponse>(
      `${this.DASHBOARD_REQUEST_API}/myDonationSummary`
    );
  }

  getAllDonationSummary(): Observable<MyDonationSummaryResponse> {
    return this.http.get<MyDonationSummaryResponse>(
      `${this.DASHBOARD_REQUEST_API}/GetDonationSummary`
    );
  }
}
