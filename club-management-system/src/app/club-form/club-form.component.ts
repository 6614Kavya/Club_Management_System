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
  selector: 'app-club-form',
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
        <mat-label> Club Name</mat-label>
        <input
          matInput
          placeholder="Enter club name"
          [formControl]="clubName"
        />
      </mat-form-field>
      <mat-form-field>
        <mat-label> Club Address</mat-label>
        <input
          matInput
          placeholder="Enter club address"
          [formControl]="clubAddress"
        />
      </mat-form-field>
      <mat-form-field>
        <mat-label> Club Description</mat-label>
        <input
          matInput
          placeholder="Enter club description"
          [formControl]="clubDescription"
        />
      </mat-form-field>
      <!-- <mat-checkbox>Hide required marker</mat-checkbox> -->
      <div class="button-container">
        <button mat-raised-button (click)="submit()">Save Details</button>
      </div>
    </div>
  `,
  styleUrl: './club-form.component.css',
})
export class ClubFormComponent {
  constructor(private dialogRef: MatDialogRef<ClubFormComponent>) {}

  clubName = new FormControl('');
  clubAddress = new FormControl('');
  clubDescription = new FormControl('');

  submit() {
    const data: any = {
      clubName: this.clubName.value,
      clubAddress: this.clubAddress.value,
      clubDescription: this.clubDescription.value,
    };

    this.dialogRef.close(data);
  }
}
