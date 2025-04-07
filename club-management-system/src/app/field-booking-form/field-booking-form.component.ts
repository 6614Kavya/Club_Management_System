import { Component, ChangeDetectionStrategy, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTimepickerModule } from '@angular/material/timepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-field-booking-form',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    FormsModule,
    MatButtonModule,
    MatTimepickerModule,
    MatDatepickerModule,
    CommonModule,
  ],
  providers: [provideNativeDateAdapter()],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="container">
      <mat-form-field>
        <mat-label>Name</mat-label>
        <input matInput placeholder="Enter your name" [formControl]="name" />
      </mat-form-field>
      <mat-form-field>
        <mat-label>Booking Purpose</mat-label>
        <input
          matInput
          placeholder="Enter Booking purpose"
          [formControl]="bookingPurpose"
        />
      </mat-form-field>
      <mat-form-field>
        <mat-label>Booking date</mat-label>
        <input
          matInput
          [matDatepicker]="datepicker"
          [formControl]="bookingDate"
        />
        <mat-datepicker #datepicker />
        <mat-datepicker-toggle [for]="datepicker" matSuffix />
      </mat-form-field>

      <mat-form-field>
        <mat-label>Booking time</mat-label>
        <input
          matInput
          [matTimepicker]="timepicker"
          [formControl]="bookingTime"
        />
        <mat-timepicker #timepicker />
        <mat-timepicker-toggle [for]="timepicker" matSuffix />
      </mat-form-field>

      <div class="button-container">
        <button mat-raised-button (click)="submit()">Save Details</button>
      </div>
    </div>
  `,
  styleUrl: './field-booking-form.component.css',
})
export class FieldBookingFormComponent {
  constructor(
    private dialogRef: MatDialogRef<FieldBookingFormComponent> // @Inject(MAT_DIALOG_DATA) // public data: { clubName: string; clubAddress: string; admins: string[] }
  ) {}
  name = new FormControl('');
  bookingPurpose = new FormControl('');
  bookingDate = new FormControl<Date | null>(null);
  bookingTime = new FormControl<string | null>(null);
  // meetingDate: Date | null = null;
  // meetingTime: string | null = null;

  value: Date | undefined;
  submit() {
    console.log('Time and date', this.bookingDate, this.bookingTime);
    const formattedDate = this.bookingDate.value
      ? new Date(this.bookingDate.value).toLocaleDateString('en-CA') // outputs YYYY-MM-DD in local time
      : null;

    const formattedTime = this.bookingTime.value
      ? new Date(this.bookingTime.value)
          .toTimeString()
          .split(' ')[0]
          .slice(0, 5)
      : null;
    this.dialogRef.close({
      id: 0,
      selectedDate: formattedDate,
      startTime: formattedTime,
      endTime: formattedTime,
      bookingStatus: '',
      bookedBy: this.name.value,
      bookingPurpose: this.bookingPurpose.value,
      facilities: [''],
    });
  }
}
