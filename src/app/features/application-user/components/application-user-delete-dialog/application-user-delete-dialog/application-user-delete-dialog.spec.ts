import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicationUserDeleteDialog } from './application-user-delete-dialog';

describe('ApplicationUserDeleteDialog', () => {
  let component: ApplicationUserDeleteDialog;
  let fixture: ComponentFixture<ApplicationUserDeleteDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ApplicationUserDeleteDialog],
    }).compileComponents();

    fixture = TestBed.createComponent(ApplicationUserDeleteDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
