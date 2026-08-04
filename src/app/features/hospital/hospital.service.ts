import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import type { HospitalResponse } from './models/hospital-response.model';
import type { PageResponse } from '../../core/models/page-response.model';
import type { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HospitalService {
  private readonly HOSPITAL_API = `${environment.apiUrl}/hospital`;
  constructor(private http: HttpClient) {}

  getAllHospitals(
    page: number,
    size: number,
    sortOrder: string,
    isActive: boolean,
  ): Observable<PageResponse<HospitalResponse>> {
    const params = new HttpParams()
      .set('page', page)
      .set('size', size)
      .set('sortDirection', sortOrder)
      .set('isActive', isActive);

    return this.http.get<PageResponse<HospitalResponse>>(`${this.HOSPITAL_API}/getAllHospitals`, {
      params,
    });
  }

  searchHospitals(
    page: number,
    size: number,
    sortOrder: string,
    isActive: boolean,
    search: string,
  ): Observable<PageResponse<HospitalResponse>> {
    const params = new HttpParams()
      .set('page', page)
      .set('size', size)
      .set('sortDirection', sortOrder)
      .set('isActive', isActive)
      .set('search', search);

    return this.http.get<PageResponse<HospitalResponse>>(`${this.HOSPITAL_API}/search`, {
      params,
    });
  }

  getHospitalById(hospitalId: string): Observable<HospitalResponse> {
    return this.http.get<HospitalResponse>(`${this.HOSPITAL_API}/getHospitalById/${hospitalId}`);
  }
}
