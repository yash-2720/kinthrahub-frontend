import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { HttpClient, HttpParams } from '@angular/common/http';
import { DonationPlanService } from '../donation-plan/donation-plan.service';
import { HospitalService } from '../hospital/hospital.service';
import type { PageResponse } from '../../core/models/page-response.model';
import type { DonationRequestResponse } from './models/donation-request-response';
import type { Observable } from 'rxjs';
import type { DonationRequest } from './models/donation-request';

@Injectable({
  providedIn: 'root',
})
export class DonationRequestService {
  private readonly DONATION_REQUEST_API = `${environment.apiUrl}/donationRequest`;
  constructor(private http: HttpClient) {}

  getAllDonationRequests(
    page: number,
    size: number,
    isActive: boolean,
  ): Observable<PageResponse<DonationRequestResponse>> {
    const params = new HttpParams().set('page', page).set('size', size).set('isActive', isActive);
    return this.http.get<PageResponse<DonationRequestResponse>>(
      `${this.DONATION_REQUEST_API}/getAllDonationRequests`,
      {
        params,
      },
    );
  }
  searchDonationRequests(
    page: number,
    size: number,
    isActive: boolean,
    search: string,
  ): Observable<PageResponse<DonationRequestResponse>> {
    const params = new HttpParams()
      .set('page', page)
      .set('size', size)
      .set('isActive', isActive)
      .set('search', search);
    return this.http.get<PageResponse<DonationRequestResponse>>(
      `${this.DONATION_REQUEST_API}/search`,
      {
        params,
      },
    );
  }

  getDonationRequestById(donationRequestId: string): Observable<DonationRequestResponse> {
    return this.http.get<DonationRequestResponse>(
      `${this.DONATION_REQUEST_API}/getDonationRequestById/${donationRequestId}`,
    );
  }

  cancelDonationRequest(donationRequestId: string): Observable<DonationRequestResponse> {
    return this.http.delete<DonationRequestResponse>(
      `${this.DONATION_REQUEST_API}/cancelDonationRequest/${donationRequestId}`,
    );
  }

  createDonationRequest(request: DonationRequest): Observable<DonationRequestResponse> {
    return this.http.post<DonationRequestResponse>(
      `${this.DONATION_REQUEST_API}/createDonationRequest`,
      request,
    );
  }
}
