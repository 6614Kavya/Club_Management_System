import { Component, Inject } from '@angular/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FieldData } from '../../Data/field-data';

@Component({
  selector: 'app-edit-field',
  standalone: true,
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
          placeholder="Enter Field name"
          [formControl]="fieldName"
        />
      </mat-form-field>
      <mat-form-field>
        <mat-label> Field Address</mat-label>
        <input
          matInput
          placeholder="Enter Field address"
          [formControl]="fieldAddress"
        />
      </mat-form-field>
      <mat-form-field>
        <mat-label> Club Name</mat-label>
        <input
          matInput
          placeholder="Enter Club Name"
          [formControl]="clubName"
        />
      </mat-form-field>
      <mat-form-field>
        <mat-label> Field Admins</mat-label>
        <!-- <input
          matInput
          placeholder="Enter Club admin"
          [formControl]="clubAdmin"
        /> -->
        <mat-select [formControl]="fieldAdmin" multiple>
          @for (admin of allAdmins; track fieldAdmin) {
          <mat-option [value]="admin">{{ admin }}</mat-option>
          }
        </mat-select>
      </mat-form-field>

      <div class="button-container">
        <button mat-raised-button (click)="submit()">Save Details</button>
      </div>
    </div>
  `,
  styleUrl: './edit-field.component.css',
})
export class EditFieldComponent {
  constructor(
    private dialogRef: MatDialogRef<EditFieldComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      fieldName: string;
      fieldAddress: string;
      clubName: string;
      admins: string[];
    }
  ) {
    this.fieldName.setValue(data.fieldName);
    this.fieldAddress.setValue(data.fieldAddress);
    this.clubName.setValue(data.clubName);
    this.fieldAdmin.setValue(data.admins ?? []);

    this.availableAdmins = data.admins;
    this.existingAdmins = FieldData.map((admin) => admin.field_admin);

    // Merge and remove duplicates
    this.allAdmins = [
      ...new Set([...this.availableAdmins, ...this.existingAdmins.flat()]),
    ];
  }
  existingAdmins: string[][] = [];
  availableAdmins: string[] = [];
  allAdmins: string[] = [];
  fieldName = new FormControl('');
  fieldAddress = new FormControl('');
  clubName = new FormControl('');
  fieldAdmin = new FormControl<string[]>([]);

  submit() {
    // Emit the updated club data, including the selected admins.
    this.dialogRef.close({
      fieldName: this.fieldName.value,
      fieldAddress: this.fieldAddress.value,
      clubName: this.clubName.value,
      admins: this.fieldAdmin.value,
    });
  }
}
