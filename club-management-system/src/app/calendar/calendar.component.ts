import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FullCalendarModule } from '@fullcalendar/angular';
import { CalendarOptions, EventClickArg } from '@fullcalendar/core'; // useful for typechecking
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin, { DateClickArg } from '@fullcalendar/interaction';
import { BookingService, Booking } from '../services/bookings/booking.service';
import { BookingDetailsCardComponent } from '../booking-details-card/booking-details-card.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDialog } from '@angular/material/dialog';
import { FieldBookingFormComponent } from '../field-booking-form/field-booking-form.component';
import {
  FieldPart,
  FieldPartSelectionComponent,
} from '../field-part-selection/field-part-selection.component';
import { WeekNumberContainer } from '@fullcalendar/core/internal';
import { ActivatedRoute } from '@angular/router';
import { FieldService } from '../services/field/field.service';
import { Field } from '../services/field/field.service';

@Component({
  selector: 'app-calendar',
  imports: [FullCalendarModule, MatDialogModule, CommonModule],
  template: `
    <full-calendar [options]="calendarOptions"></full-calendar>

    <!-- <app-field-part-selection
      [parts]="fieldTemplate.parts"
      (selectionChanged)="onFieldPartChange($event)"
    ></app-field-part-selection> -->
  `,
  styleUrl: './calendar.component.css',
})
export class CalendarComponent {
  route: ActivatedRoute = inject(ActivatedRoute);
  onFieldPartChange(event: number) {
    console.log('Field part', event);
  }
  bookingService: BookingService = inject(BookingService);
  fieldService: FieldService = inject(FieldService);

  selectedDate: string | null = null;
  allBookings: Booking[] = [];
  fieldId: any;

  eventList: any = [];

  constructor(private dialogRef: MatDialog) {
    this.loadAllBookings();
    this.fieldId = String(this.route.snapshot.params['id']);

    this.loadAllBookings();

    // this.fieldService
    //   .getFieldDetailsById(this.fieldId)
    //   .subscribe(
    //     (fieldDetails) => (
    //       console.log('Field details', fieldDetails),
    //       (this.fieldData = fieldDetails)
    //     )
    //   );
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
      // date: newBooking.selectedDate,
      // allDay: true,
      start: newBooking.startTime,
      end: newBooking.endTime,
      id: newBooking.id,
      // display: 'background',
      // backgroundColor: '#ff9f89', //
      extendedProps: {
        bookingId: newBooking.id,
        name: newBooking.bookedBy,
        purpose: newBooking.bookingPurpose,
        startTime: newBooking.startTime,
        endTime: newBooking.endTime,
        bookingDate: newBooking.selectedDate,
        fieldPart: newBooking.fieldPart,
        // display: 'background',
        // eventColor: '#ff9f89',
      },
    };

    this.eventList.push(newEvent); // update local list
    this.allBookings.push({
      id: 0,
      // selectedDate: newEvent.date,
      startTime: newEvent.extendedProps.startTime,
      endTime: newEvent.extendedProps.endTime,
      bookingStatus: '',
      // bookedBy: newEvent.extendedProps.name,
      bookingPurpose: newEvent.extendedProps.purpose,
      // fieldPart: newEvent.extendedProps.fieldPart,
      // facilities: [''],
    });
    this.calendarOptions.events = [...this.eventList];

    this.bookingService.createBooking(newBooking).subscribe({
      next: (response: any) => {
        console.log('Respone of create booking', response);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  /** Load all bookings and set them in FullCalendar */
  loadAllBookings() {
    // this.allBookings = this.bookingService.getBookingsByFieldId(this.fieldId); // Implement this method in BookingService

    this.bookingService.getBookingsByFieldId(this.fieldId).subscribe({
      next: (booking) => {
        console.log('Bookings for this field:', booking);
        this.allBookings = booking;
        console.log('allBookings for this field:', this.allBookings);

        this.eventList = this.allBookings.map((booking) => ({
          title: booking.bookingPurpose,
          start: booking.startTime,
          end: booking.endTime,
          id: booking.id.toString(),
          extendedProps: {
            bookingId: booking.id,
            name: booking.bookedBy,
            purpose: booking.bookingPurpose,
            startTime: booking.startTime,
            endTime: booking.endTime,
            bookingDate: booking.selectedDate,
            fieldPart: booking.fieldPart,
          },
        }));

        this.calendarOptions.events = [...this.eventList];
      },
      error: (err) => {
        console.error('Error loading bookings:', err);
      },
    });

    // this.eventList = this.allBookings.map((booking) => ({
    //   title: booking.bookingPurpose,
    //   // date: booking.selectedDate,
    //   start: booking.startTime,
    //   end: booking.endTime,
    //   // allDay: true,
    //   id: booking.id.toString(),
    //   // display: 'background',
    //   // eventColor: '#ff9f89', //
    //   extendedProps: {
    //     bookingId: booking.id,
    //     name: booking.bookedBy,
    //     purpose: booking.bookingPurpose,
    //     startTime: booking.startTime,
    //     endTime: booking.endTime,
    //     bookingDate: booking.selectedDate,
    //     fieldPart: booking.fieldPart,
    //     // display: 'background',
    //     // backgroundColor: '#ff9f89', //
    //   },
    // }));

    // this.calendarOptions.events = [...this.eventList];

    // this.calendarOptions.events = [
    //   {
    //     title: 'Event A',
    //     start: '2025-05-20T10:00:00',
    //     end: '2025-05-20T13:00:00',
    //     id: '1',
    //   },
    //   {
    //     title: 'Event B',
    //     start: '2025-05-20T10:00:00',
    //     end: '2025-05-20T17:00:00',
    //     id: '2',
    //   },
    // ];
  }
  calendarOptions: CalendarOptions = {
    initialView: 'timeGridWeek',
    plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
    timeZone: 'local',
    slotEventOverlap: false, // Forces side-by-side layout
    eventOverlap: true, // Allows overlapping
    eventDisplay: 'auto', // Ensures full event block shows
    nowIndicator: true, // Optional: shows current time line
    dateClick: (arg) => this.handleDateClick(arg),
    eventClick: (arg) => this.handleEventClick(arg),
    // events: [
    //   {
    //     title: 'Event A',
    //     start: '2025-05-19T10:00:00',
    //     end: '2025-05-19T11:00:00',
    //   },
    //   {
    //     title: 'Event B',
    //     start: '2025-05-19T10:00:00',
    //     end: '2025-05-19T11:00:00',
    //   },
    // ],

    // validRange: {
    //   start: new Date().toISOString().split('T')[0], // disables past dates
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
      data: { date: this.selectedDate, fieldId: this.fieldId },
    });

    dialogRef.afterClosed().subscribe((newBooking: Booking | null) => {
      if (newBooking) {
        console.log('New Booking', newBooking);
        this.addNewEvent(newBooking);
      }
    });
  }

  // fieldTemplate = {
  //   // name: 'FIELDS.TEMPLATE2',
  //   // physicalPartsMask: 0b1111,
  //   parts: [
  //     new FieldPart('1', 0b0001), // Top-left
  //     new FieldPart('2', 0b0010), // Below Part 1
  //     new FieldPart('3', 0b0100), // Top-right
  //     new FieldPart('4', 0b1000), // Below Part 3
  //     new FieldPart('1-2', 0b0011),
  //     new FieldPart('3-4', 0b1100),
  //     new FieldPart('1-4', 0b1111),
  //   ],
  // };
}
