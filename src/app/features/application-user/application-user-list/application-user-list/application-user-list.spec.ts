import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicationUserList } from './application-user-list';

describe('ApplicationUserList', () => {
  let component: ApplicationUserList;
  let fixture: ComponentFixture<ApplicationUserList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ApplicationUserList],
    }).compileComponents();

    fixture = TestBed.createComponent(ApplicationUserList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
