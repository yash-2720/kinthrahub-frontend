import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PayrollSuccessDialog } from './payroll-success-dialog';

describe('PayrollSuccessDialog', () => {
  let component: PayrollSuccessDialog;
  let fixture: ComponentFixture<PayrollSuccessDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PayrollSuccessDialog],
    }).compileComponents();

    fixture = TestBed.createComponent(PayrollSuccessDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
