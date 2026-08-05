import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigureDonations } from './configure-donations';

describe('ConfigureDonations', () => {
  let component: ConfigureDonations;
  let fixture: ComponentFixture<ConfigureDonations>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfigureDonations],
    }).compileComponents();

    fixture = TestBed.createComponent(ConfigureDonations);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
