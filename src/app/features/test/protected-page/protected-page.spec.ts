import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProtectedPage } from './protected-page';

describe('ProtectedPage', () => {
  let component: ProtectedPage;
  let fixture: ComponentFixture<ProtectedPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProtectedPage],
    }).compileComponents();

    fixture = TestBed.createComponent(ProtectedPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
