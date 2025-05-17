import {
  Component,
  ChangeDetectionStrategy,
  Inject,
  inject,
} from '@angular/core';
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
import { FieldService } from '../services/field/field.service';

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

      <div>
        <mat-label>Select Field Part</mat-label>
        <app-field-part-selection
          [parts]="fieldTemplate.parts"
          (selectionChanged)="onFieldPartChange($event)"
        ></app-field-part-selection>
      </div>

      <mat-form-field>
        <mat-label>Booking date</mat-label>
        <input
          matInput
          [matDatepicker]="datepicker"
          [formControl]="bookingDate"
          [min]="minDate"
        />
        <mat-datepicker #datepicker />
        <mat-datepicker-toggle [for]="datepicker" matSuffix />
      </mat-form-field>

      <div class="time-container">
        <mat-form-field>
          <mat-label>Start time</mat-label>
          <input
            matInput
            [matTimepicker]="startTimepicker"
            [formControl]="startTime"
          />
          <mat-timepicker #startTimepicker />
          <mat-timepicker-toggle [for]="startTimepicker" matSuffix />
        </mat-form-field>

        <mat-form-field>
          <mat-label>End time</mat-label>
          <input
            matInput
            [matTimepicker]="endTimepicker"
            [formControl]="endTime"
          />
          <mat-timepicker #endTimepicker />
          <mat-timepicker-toggle [for]="endTimepicker" matSuffix />
        </mat-form-field>
      </div>

      <div class="button-container">
        <button mat-raised-button (click)="submit()">Save Details</button>
      </div>
    </div>
  `,
  styleUrl: './field-booking-form.component.css',
})
export class FieldBookingFormComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: { date: string; fieldId: string },
    private dialogRef: MatDialogRef<FieldBookingFormComponent> // @Inject(MAT_DIALOG_DATA) // public data: { clubName: string; clubAddress: string; admins: string[] }
  ) {
    this.bookingDate.setValue(data.date);
    this.fieldId = data.fieldId;

    this.fieldService.getFieldDetailsById(this.fieldId).subscribe(
      (fieldDetails) => (
        console.log('Field details', fieldDetails),
        // (this.fieldData = fieldDetails)
        (this.fieldTemplate.parts = fieldDetails.fieldPart?.$values.map(
          (p: any) => new FieldPart(p.id, p.name, p.bitmask, p.selected)
        ))
      )
    );
  }
  fieldId: string;
  name = new FormControl('');
  bookingPurpose = new FormControl('');
  bookingDate = new FormControl<string | null>(null);
  startTime = new FormControl<any | null>(null);
  endTime = new FormControl<any | null>(null);
  fieldPart: string | undefined;

  minDate: Date = new Date(); //restricts past dates

  value: Date | undefined;

  fieldService: FieldService = inject(FieldService);

  submit() {
    console.log(
      'Time and date',
      this.bookingDate,
      this.startTime,
      this.endTime
    );

    // const formattedDate = this.bookingDate.value
    //   ? new Date(this.bookingDate.value).toLocaleDateString('en-CA') // outputs YYYY-MM-DD in local time
    //   : null;

    // const formattedStartTime = this.startTime.value
    //   ? new Date(this.startTime.value).toTimeString().split(' ')[0].slice(0, 5)
    //   : null;
    // const formattedEndTime = this.endTime.value
    //   ? new Date(this.endTime.value).toTimeString().split(' ')[0].slice(0, 5)
    //   : null;
    const dateValue = this.bookingDate.value
      ? new Date(this.bookingDate.value)
      : null;
    const start = this.startTime.value as Date;
    const end = this.endTime.value as Date;

    if (!dateValue || !start || !end) {
      alert('Please fill in all fields.');
      return;
    }

    // Construct local DateTime (in SLST)
    const startDateTimeLocal = new Date(
      dateValue.getFullYear(),
      dateValue.getMonth(),
      dateValue.getDate(),
      start.getHours(),
      start.getMinutes()
    );

    const endDateTimeLocal = new Date(
      dateValue.getFullYear(),
      dateValue.getMonth(),
      dateValue.getDate(),
      end.getHours(),
      end.getMinutes()
    );

    // Convert to UTC ISO string manually
    const startDateTimeUtc = new Date(
      startDateTimeLocal.getTime() -
        startDateTimeLocal.getTimezoneOffset() * 60000
    ).toISOString();

    const endDateTimeUtc = new Date(
      endDateTimeLocal.getTime() - endDateTimeLocal.getTimezoneOffset() * 60000
    ).toISOString();

    this.dialogRef.close({
      FieldPartId: 'C04DC7BA-A804-4020-84DB-1715DF777FFC',
      // selectedDate: formattedDate,
      startTime: startDateTimeUtc,
      endTime: endDateTimeUtc,
      bookingStatus: '',
      bookedBy: this.name.value,
      bookingPurpose: this.bookingPurpose.value,
      facilities: [''],
      fieldPart: this.fieldPart,
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

  fieldTemplate = { parts: [] };

  onFieldPartChange(event: string) {
    console.log('Field part', event);
    this.fieldPart = event;
    return event;
  }
}
