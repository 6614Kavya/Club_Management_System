import { CommonModule } from '@angular/common';
import { Component, inject, Inject, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { Booking } from '../services/bookings/booking.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { BookingService } from '../services/bookings/booking.service';

@Component({
  selector: 'app-booking-details-card',
  imports: [MatButtonModule, MatCardModule, CommonModule],
  template: `
    <div class="container">
      <mat-card class="booking-card">
        <mat-card-header>
          <mat-card-title>Booking Details</mat-card-title>
          <mat-card-subtitle>{{
            bookingData?.selectedDate | date : 'fullDate'
          }}</mat-card-subtitle>
        </mat-card-header>

        <mat-card-content>
          <!-- <p><strong>Field:</strong> {{ fieldName }}</p> -->
          <p>
            <strong>Time Slot:</strong> {{ bookingData?.startTime }} -
            {{ bookingData?.endTime }}
          </p>
          <p>
            <strong>Booking Status:</strong>
            <span [ngClass]="statusClass">{{
              bookingData?.bookingStatus
            }}</span>
          </p>
          <p><strong>Booked By:</strong> {{ bookingData?.bookedBy }}</p>
          <p><strong>Purpose:</strong> {{ bookingData?.bookingPurpose }}</p>
          <!-- <p>
          <strong>Facilities Used:</strong>
          {{ bookingData.facilities.join(', ') }}
        </p> -->
        </mat-card-content>

        <mat-card-actions>
          <!-- <button mat-button color="primary" (click)="confirmBooking()">
            Confirm
          </button> -->
          <!-- <button mat-button color="accent" (click)="editBooking()">
            Edit
          </button> -->
          <!-- <button mat-button color="warn" (click)="cancelBooking()">
            Cancel
          </button> -->
        </mat-card-actions>
      </mat-card>
    </div>
  `,
  styleUrl: './booking-details-card.component.css',
})
export class BookingDetailsCardComponent {
  constructor(
    private dialogRef: MatDialogRef<BookingDetailsCardComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { bookingId: number }
  ) {}

  ngOnInit() {
    this.bookingCardId = this.data.bookingId;
    this.bookingData = this.bookingService.getBookingById(this.bookingCardId);
    console.log('Loaded Booking Data:', this.bookingData); // Debugging log
    console.log('Loaded Booking Id:', this.bookingCardId);
  }

  bookingCardId: number | undefined;

  bookingService: BookingService = inject(BookingService);

  @Input() selectedDate!: string | null;
  @Input() bookings: Booking[] = [];
  @Input() bookingData!: Booking | undefined;
  statusClass:
    | string
    | string[]
    | Set<string>
    | { [klass: string]: any }
    | null
    | undefined;

  cancelBooking() {
    throw new Error('Method not implemented.');
  }
  editBooking() {
    throw new Error('Method not implemented.');
  }
  confirmBooking() {
    throw new Error('Method not implemented.');
  }
}
