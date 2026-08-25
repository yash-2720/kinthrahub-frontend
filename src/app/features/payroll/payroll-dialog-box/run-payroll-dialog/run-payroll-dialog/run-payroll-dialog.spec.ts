import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RunPayrollDialog } from './run-payroll-dialog';

describe('RunPayrollDialog', () => {
  let component: RunPayrollDialog;
  let fixture: ComponentFixture<RunPayrollDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RunPayrollDialog],
    }).compileComponents();

    fixture = TestBed.createComponent(RunPayrollDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
