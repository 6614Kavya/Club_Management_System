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
import {
  FieldPart,
  FieldPartSelectionComponent,
} from '../field-part-selection/field-part-selection.component';

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
    FieldPartSelectionComponent,
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

      <app-field-part-selection
        [parts]="fieldTemplate.parts"
        (selectionChanged)="onFieldPartChange($event)"
      ></app-field-part-selection>

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
  fieldPart: number = 0;

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
      fieldPart: this.fieldPart,
    });
  }

  fieldTemplate = {
    // name: 'FIELDS.TEMPLATE2',
    // physicalPartsMask: 0b1111,
    parts: [
      new FieldPart('1', 0b0001), // Top-left
      new FieldPart('2', 0b0010), // Below Part 1
      new FieldPart('3', 0b0100), // Top-right
      new FieldPart('4', 0b1000), // Below Part 3
      new FieldPart('1-2', 0b0011),
      new FieldPart('3-4', 0b1100),
      new FieldPart('1-4', 0b1111),
    ],
  };

  onFieldPartChange(event: number) {
    console.log('Field part', event);
    this.fieldPart = event;
    return event;
  }
}
