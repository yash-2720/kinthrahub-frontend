import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { HttpClient, HttpParams } from '@angular/common/http';
import { PageResponse } from '../../core/models/page-response.model';
import { DonationPlanResponse } from './models/donation-plan-response.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DonationPlanService {
  private readonly DONATION_PLAN_API = `${environment.apiUrl}/donationPlan`;
  constructor(private http: HttpClient) {}

  getAllDonationPlans(
    page: number,
    size: number,
    sortOrder: string,
    isActive: boolean,
  ): Observable<PageResponse<DonationPlanResponse>> {
    const params = new HttpParams()
      .set('page', page)
      .set('size', size)
      .set('sortDirection', sortOrder)
      .set('isActive', isActive);

    return this.http.get<PageResponse<DonationPlanResponse>>(
      `${this.DONATION_PLAN_API}/getAllDonationPlans`,
      {
        params,
      },
    );
  }

  searchDonationPlans(
    page: number,
    size: number,
    sortOrder: string,
    isActive: boolean,
    search: string,
  ): Observable<PageResponse<DonationPlanResponse>> {
    const params = new HttpParams()
      .set('page', page)
      .set('size', size)
      .set('sortDirection', sortOrder)
      .set('isActive', isActive)
      .set('search', search);

    return this.http.get<PageResponse<DonationPlanResponse>>(`${this.DONATION_PLAN_API}/search`, {
      params,
    });
  }

  getDonationPlanById(donationPlanId: string): Observable<DonationPlanResponse> {
    return this.http.get<DonationPlanResponse>(
      `${this.DONATION_PLAN_API}/getDonationPlanById/${donationPlanId}`,
    );
  }

  getDonationPlansByHospital(
    hospitalId: string,
    isActive: boolean,
  ): Observable<DonationPlanResponse[]> {
    const params = new HttpParams().set('isActive', isActive);
    return this.http.get<DonationPlanResponse[]>(
      `${this.DONATION_PLAN_API}/getDonationPlanByHospitalId/${hospitalId}`,
      { params },
    );
  }
}
