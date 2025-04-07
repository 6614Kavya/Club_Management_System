import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FullCalendarModule } from '@fullcalendar/angular';
import { CalendarOptions, EventClickArg } from '@fullcalendar/core'; // useful for typechecking
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin, { DateClickArg } from '@fullcalendar/interaction';
import { BookingService, Booking } from '../services/bookings/booking.service';
import { BookingDetailsCardComponent } from '../booking-details-card/booking-details-card.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDialog } from '@angular/material/dialog';
import { FieldBookingFormComponent } from '../field-booking-form/field-booking-form.component';

@Component({
  selector: 'app-calendar',
  imports: [FullCalendarModule, MatDialogModule, CommonModule],
  template: `
    <full-calendar [options]="calendarOptions"></full-calendar>
    <!-- <app-booking-details-card
      *ngIf="selectedDate"
      [selectedDate]="selectedDate"
      [bookings]="allBookings"
    ></app-booking-details-card> -->
    <!-- <app-field-booking-form></app-field-booking-form> -->
  `,
  styleUrl: './calendar.component.css',
})
export class CalendarComponent {
  bookingService: BookingService = inject(BookingService);

  selectedDate: string | null = null;
  allBookings: Booking[] = [];

  eventList: any = [];

  constructor(private dialogRef: MatDialog) {
    this.loadAllBookings();
  }

  handleEventClick(arg: EventClickArg): void {
    const bookingId = arg.event.extendedProps['bookingId'];
    console.log('Sent booking Id:', bookingId); // Ensure the bookingId is not undefined

    // if (!bookingId) {
    //   console.error('Error: bookingId is undefined. Check event data.');
    //   return; // Exit early if no bookingId
    // }

    const dialogRef = this.dialogRef.open(BookingDetailsCardComponent, {
      // width: '500px',
      // height: 'auto',
      // maxWidth: '90vw',
      panelClass: 'custom-dialog-container',
      data: { bookingId },
    });
  }

  addNewEvent(newBooking: Booking) {
    const newEvent = {
      title: newBooking.bookingPurpose,
      date: newBooking.selectedDate,
      allDay: true,
      id: newBooking.id.toString(),
      extendedProps: {
        bookingId: newBooking.id,
        name: newBooking.bookedBy,
        purpose: newBooking.bookingPurpose,
        startTime: newBooking.startTime,
        endTime: newBooking.endTime,
        bookingDate: newBooking.selectedDate,
      },
    };

    this.eventList.push(newEvent); // update local list
    this.allBookings.push({
      id: 0,
      selectedDate: newEvent.date,
      startTime: newEvent.extendedProps.startTime,
      endTime: newEvent.extendedProps.endTime,
      bookingStatus: '',
      bookedBy: newEvent.extendedProps.name,
      bookingPurpose: newEvent.extendedProps.purpose,
      facilities: [''],
    });
    this.calendarOptions.events = [...this.eventList];
  }

  /** Load all bookings and set them in FullCalendar */
  loadAllBookings() {
    this.allBookings = this.bookingService.getBookingsByFieldId(101); // Implement this method in BookingService
    this.eventList = this.allBookings.map((booking) => ({
      title: booking.bookingPurpose,
      date: booking.selectedDate,
      allDay: true,
      id: booking.id.toString(),
      extendedProps: {
        bookingId: booking.id,
        name: booking.bookedBy,
        purpose: booking.bookingPurpose,
        startTime: booking.startTime,
        endTime: booking.endTime,
        bookingDate: booking.selectedDate,
      },
    }));

    this.calendarOptions.events = [...this.eventList];
  }
  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    plugins: [dayGridPlugin, interactionPlugin],
    dateClick: (arg) => this.handleDateClick(arg),
    eventClick: (arg) => this.handleEventClick(arg),
    // events: this.allBookings.map((booking) => ({
    //   title: booking.bookingPurpose,
    //   date: booking.selectedDate,
    //   id: booking.id.toString(), // Store booking ID as event id
    //   extendedProps: { bookingId: booking.id },
    // })),
    // { title: 'Custom Component Event', date: '2025-04-01', id: 'custom1' },
    // { title: 'Another Event', date: '2025-04-02' },

    // eventContent: (arg) => {
    //   if (arg.event.id === 'custom1') {
    //     return {
    //       html: '<div class="custom-event"><b>Special Event</b></div>',
    //     };
    //   } else {
    //     return '';
    //   }
    // },
  };
  handleDateClick(arg: DateClickArg) {
    this.selectedDate = arg.dateStr;
    // this.bookings = this.bookingService.getBookingsByDate(arg.dateStr);

    const dialogRef = this.dialogRef.open(FieldBookingFormComponent, {
      width: '500px',
      height: 'auto',
      maxWidth: '90vw',
      panelClass: 'custom-dialog-container',
      // data: { bookingId },
    });

    dialogRef.afterClosed().subscribe((newBooking: Booking | null) => {
      if (newBooking) {
        console.log('New Booking', newBooking);
        this.addNewEvent(newBooking);
      }
    });
  }
}
