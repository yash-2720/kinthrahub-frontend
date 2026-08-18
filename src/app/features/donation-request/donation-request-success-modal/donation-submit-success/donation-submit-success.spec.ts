import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DonationSubmitSuccess } from './donation-submit-success';

describe('DonationSubmitSuccess', () => {
  let component: DonationSubmitSuccess;
  let fixture: ComponentFixture<DonationSubmitSuccess>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DonationSubmitSuccess],
    }).compileComponents();

    fixture = TestBed.createComponent(DonationSubmitSuccess);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
