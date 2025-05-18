import { inject, Injectable } from '@angular/core';
import { Clubs } from '../../Data/club-main-data';
import { DateClickArg } from '@fullcalendar/interaction/index.js';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment.development';

export interface Booking {
  id: any;
  selectedDate?: string;
  startTime: string;
  endTime: string;
  bookingStatus: string;
  bookedBy?: string;
  bookingPurpose: string;
  facilities?: string[];
  fieldPart?: number;
}

@Injectable({
  providedIn: 'root',
})
export class BookingService {
  constructor() {}

  private http = inject(HttpClient);

  private createBookingUrl = environment.apiURL + '/api/Booking';

  getBookingsByFieldId(fieldId: number): Booking[] {
    return (
      Clubs.flatMap((club) => club.fieldList).find(
        (field) => field.id === fieldId
      )?.bookings || []
    );
  }

  getBookingsByDate(date: string | null) {
    return Clubs.flatMap((club) => club.fieldList)
      .flatMap((field) => field.bookings)
      .filter((booking) => booking.selectedDate === date);
  }

  getBookingById(bookingId: number): Booking | undefined {
    return Clubs.flatMap((club) => club.fieldList || []) // Ensure fields exist
      .flatMap((field) => field.bookings || []) // Ensure bookings exist
      .find((booking) => booking.id === bookingId);
  }

  createBooking(booking: Booking) {
    return this.http.post(this.createBookingUrl, booking);
  }

  getBookingsByStatus(status: string) {
    const url = `${environment.apiURL}/status?status=${encodeURIComponent(
      status
    )}`;
    return this.http.get<Booking[]>(url);
  }
}
