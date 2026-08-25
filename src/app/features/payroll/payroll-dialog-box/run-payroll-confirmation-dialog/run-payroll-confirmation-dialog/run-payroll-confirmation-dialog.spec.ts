import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RunPayrollConfirmationDialog } from './run-payroll-confirmation-dialog';

describe('RunPayrollConfirmationDialog', () => {
  let component: RunPayrollConfirmationDialog;
  let fixture: ComponentFixture<RunPayrollConfirmationDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RunPayrollConfirmationDialog],
    }).compileComponents();

    fixture = TestBed.createComponent(RunPayrollConfirmationDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
