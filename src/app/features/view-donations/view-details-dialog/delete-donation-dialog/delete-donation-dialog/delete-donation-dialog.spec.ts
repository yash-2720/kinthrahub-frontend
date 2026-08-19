import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteDonationDialog } from './delete-donation-dialog';

describe('DeleteDonationDialog', () => {
  let component: DeleteDonationDialog;
  let fixture: ComponentFixture<DeleteDonationDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeleteDonationDialog],
    }).compileComponents();

    fixture = TestBed.createComponent(DeleteDonationDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
