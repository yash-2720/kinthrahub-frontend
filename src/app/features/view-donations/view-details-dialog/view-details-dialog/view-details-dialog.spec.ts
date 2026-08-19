import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewDetailsDialog } from './view-details-dialog';

describe('ViewDetailsDialog', () => {
  let component: ViewDetailsDialog;
  let fixture: ComponentFixture<ViewDetailsDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewDetailsDialog],
    }).compileComponents();

    fixture = TestBed.createComponent(ViewDetailsDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
