import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectDonationPlans } from './select-donation-plans';

describe('SelectDonationPlans', () => {
  let component: SelectDonationPlans;
  let fixture: ComponentFixture<SelectDonationPlans>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SelectDonationPlans],
    }).compileComponents();

    fixture = TestBed.createComponent(SelectDonationPlans);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
