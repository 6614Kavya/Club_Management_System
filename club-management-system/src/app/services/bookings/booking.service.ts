import { inject, Injectable } from '@angular/core';
import { Clubs } from '../../Data/club-main-data';
import { DateClickArg } from '@fullcalendar/interaction/index.js';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment.development';
import { map, Observable } from 'rxjs';

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

export interface SelectedBookings {
  id: string;
  startTime: string;
  endTime: string;
  bookingStatus: string;
  bookingPurpose: string;
  fieldPart: {
    id: string;
    name: string;
    field: {
      id: string;
      name: string;
    };
  };
}

export interface FieldBookings {
  id: string;
  name: string;
  bookings: Booking[];
}

@Injectable({
  providedIn: 'root',
})
export class BookingService {
  constructor() {}

  private http = inject(HttpClient);

  private createBookingUrl = environment.apiURL + '/api/Booking';

  // getBookingsByFieldId(fieldId: number): Booking[] {
  //   return (
  //     Clubs.flatMap((club) => club.fieldList).find(
  //       (field) => field.id === fieldId
  //     )?.bookings || []
  //   );
  // }

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
    return this.http.get<SelectedBookings[]>(url);
  }

  updateBookingStatus(bookingId: string, newStatus: string): Observable<any> {
    const url = `${environment.apiURL}/api/Booking/${bookingId}/status`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    // Send the status in the body (if needed)
    return this.http.patch(url, JSON.stringify(newStatus), { headers });
  }

  getBookingsByFieldId(fieldId: string): Observable<Booking[]> {
    const url = `${environment.apiURL}/field/${fieldId}`;
    return this.http.get<Booking[]>(url);
  }
}
