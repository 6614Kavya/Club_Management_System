import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FieldBookingFormComponent } from './field-booking-form.component';

describe('FieldBookingFormComponent', () => {
  let component: FieldBookingFormComponent;
  let fixture: ComponentFixture<FieldBookingFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FieldBookingFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FieldBookingFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
