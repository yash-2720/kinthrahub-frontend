import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateApplicationUser } from './update-application-user';

describe('UpdateApplicationUser', () => {
  let component: UpdateApplicationUser;
  let fixture: ComponentFixture<UpdateApplicationUser>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateApplicationUser],
    }).compileComponents();

    fixture = TestBed.createComponent(UpdateApplicationUser);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
