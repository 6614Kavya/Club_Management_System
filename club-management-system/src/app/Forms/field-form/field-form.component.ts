import { Component } from '@angular/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  standalone: true,
  selector: 'app-field-form',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatCheckboxModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  template: `
    <div class="container">
      <mat-form-field>
        <mat-label> Field Name</mat-label>
        <input
          matInput
          placeholder="Enter field name"
          [formControl]="fieldName"
        />
      </mat-form-field>
      <mat-form-field>
        <mat-label> Field Address</mat-label>
        <input
          matInput
          placeholder="Enter field address"
          [formControl]="fieldAddress"
        />
      </mat-form-field>
      <mat-form-field>
        <mat-label> Field Description</mat-label>
        <input
          matInput
          placeholder="Enter field description"
          [formControl]="fieldDescription"
        />
      </mat-form-field>
      <mat-form-field>
        <mat-label> Club Name</mat-label>
        <input
          matInput
          placeholder="Enter club name"
          [formControl]="clubName"
        />
      </mat-form-field>
      <mat-checkbox>Has Lighting</mat-checkbox>
      <div class="button-container">
        <button mat-raised-button (click)="submit()">Save Details</button>
      </div>
    </div>
  `,
  styleUrl: './field-form.component.css',
})
export class FieldFormComponent {
  constructor(private dialogRef: MatDialogRef<FieldFormComponent>) {}

  fieldName = new FormControl('');
  fieldAddress = new FormControl('');
  fieldDescription = new FormControl('');
  clubName = new FormControl('');

  submit() {
    const data: any = {
      fieldName: this.fieldName.value,
      fieldAddress: this.fieldAddress.value,
      fieldDescription: this.fieldDescription.value,
      clubName: this.clubName.value,
    };

    this.dialogRef.close(data);
  }
}
