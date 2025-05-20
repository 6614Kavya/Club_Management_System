import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookingDetailsCardComponent } from '../booking-details-card/booking-details-card.component';
import { BookingService, Booking } from '../services/bookings/booking.service';

@Component({
  selector: 'app-booking-page',
  imports: [BookingDetailsCardComponent, CommonModule],
  template: `
    <div class="club-container">
      <app-booking-details-card
        *ngFor="let booking of bookingData"
        [bookingData]="booking"
      ></app-booking-details-card>
    </div>
  `,
  styleUrl: './booking-page.component.css',
})
export class BookingPageComponent {
  bookingData: Booking[] = [];
  bookingService: BookingService = inject(BookingService);

  constructor() {
    // this.bookingData = this.bookingService.getBookingsByFieldId(1);
    this.bookingService
      .getBookingsByFieldId('77C928BE-EBAA-4ED6-CA0E-08DD965BEEED')
      .subscribe({
        next: (field) => {
          console.log('Field:', field);
        },
        error: (err) => {
          console.error('Error loading field:', err);
        },
      });
  }
}
