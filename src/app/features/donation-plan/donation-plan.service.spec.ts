import { TestBed } from '@angular/core/testing';

import { DonationPlanService } from './donation-plan.service';

describe('DonationPlanService', () => {
  let service: DonationPlanService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DonationPlanService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
