import { Component, Inject } from '@angular/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ClubData } from '../Data/club-data';

@Component({
  selector: 'app-edit-club',
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
          placeholder="Enter Club name"
          [formControl]="clubName"
        />
      </mat-form-field>
      <mat-form-field>
        <mat-label> Field Address</mat-label>
        <input
          matInput
          placeholder="Enter Club address"
          [formControl]="clubAddress"
        />
      </mat-form-field>
      <mat-form-field>
        <mat-label> Field Description</mat-label>
        <!-- <input
          matInput
          placeholder="Enter Club admin"
          [formControl]="clubAdmin"
        /> -->
        <mat-select [formControl]="clubAdmin" multiple>
          @for (admin of availableAdmins; track clubAdmin) {
          <mat-option [value]="admin">{{ admin }}</mat-option>
          }
        </mat-select>
      </mat-form-field>

      <div class="button-container">
        <button mat-raised-button (click)="submit()">Save Details</button>
      </div>
    </div>
  `,
  styleUrl: './edit-club.component.css',
})
export class EditClubComponent {
  constructor(
    private dialogRef: MatDialogRef<EditClubComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: { clubName: string; clubAddress: string; admins: string[] }
  ) {
    this.clubName.setValue(data.clubName);
    this.clubAddress.setValue(data.clubAddress);
    this.clubAdmin.setValue(data.admins ?? []);

    this.availableAdmins = data.admins;
  }
  availableAdmins: string[] = [];
  clubName = new FormControl('');
  clubAddress = new FormControl('');
  clubAdmin = new FormControl<string[]>([]);

  submit() {
    this.dialogRef.close();
  }
}
