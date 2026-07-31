import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateApplicationUserDialog } from './create-application-user-dialog';

describe('CreateApplicationUserDialog', () => {
  let component: CreateApplicationUserDialog;
  let fixture: ComponentFixture<CreateApplicationUserDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateApplicationUserDialog],
    }).compileComponents();

    fixture = TestBed.createComponent(CreateApplicationUserDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
