import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicationUserViewDialog } from './application-user-view-dialog';

describe('ApplicationUserViewDialog', () => {
  let component: ApplicationUserViewDialog;
  let fixture: ComponentFixture<ApplicationUserViewDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ApplicationUserViewDialog],
    }).compileComponents();

    fixture = TestBed.createComponent(ApplicationUserViewDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
