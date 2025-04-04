import { Injectable } from '@angular/core';
import { Clubs } from '../../Data/club-main-data';
import { DateClickArg } from '@fullcalendar/interaction/index.js';

export interface Booking {
  id: number;
  selectedDate: string;
  startTime: string;
  endTime: string;
  bookingStatus: string;
  bookedBy: string;
  bookingPurpose: string;
  facilities: string[];
}

@Injectable({
  providedIn: 'root',
})
export class BookingService {
  constructor() {}

  getBookingsByFieldId(fieldId: number): Booking[] {
    return (
      Clubs.flatMap((club) => club.fields).find((field) => field.id === fieldId)
        ?.bookings || []
    );
  }

  getBookingsByDate(date: string | null) {
    return Clubs.flatMap((club) => club.fields)
      .flatMap((field) => field.bookings)
      .filter((booking) => booking.selectedDate === date);
  }

  getBookingById(bookingId: number): Booking | undefined {
    return Clubs.flatMap((club) => club.fields || []) // Ensure fields exist
      .flatMap((field) => field.bookings || []) // Ensure bookings exist
      .find((booking) => booking.id === bookingId);
  }
}
