import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewMyDonations } from './view-my-donations';

describe('ViewMyDonations', () => {
  let component: ViewMyDonations;
  let fixture: ComponentFixture<ViewMyDonations>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewMyDonations],
    }).compileComponents();

    fixture = TestBed.createComponent(ViewMyDonations);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
