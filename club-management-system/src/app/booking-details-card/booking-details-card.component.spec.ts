import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingDetailsCardComponent } from './booking-details-card.component';

describe('BookingDetailsCardComponent', () => {
  let component: BookingDetailsCardComponent;
  let fixture: ComponentFixture<BookingDetailsCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookingDetailsCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookingDetailsCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
