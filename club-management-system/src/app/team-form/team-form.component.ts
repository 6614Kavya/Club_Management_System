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
  selector: 'app-team-form',
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
        <mat-label> Team Name</mat-label>
        <input
          matInput
          placeholder="Enter team name"
          [formControl]="teamName"
        />
      </mat-form-field>
      <mat-form-field>
        <mat-label> Team Address</mat-label>
        <input
          matInput
          placeholder="Enter team address"
          [formControl]="teamAddress"
        />
      </mat-form-field>
      <mat-form-field>
        <mat-label> Team Description</mat-label>
        <input
          matInput
          placeholder="Enter team description"
          [formControl]="teamDescription"
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
      <!-- <mat-checkbox>Has Lighting</mat-checkbox> -->
      <div class="button-container">
        <button mat-raised-button (click)="submit()">Save Details</button>
      </div>
    </div>
  `,
  styleUrl: './team-form.component.css',
})
export class TeamFormComponent {
  constructor(private dialogRef: MatDialogRef<TeamFormComponent>) {}

  teamName = new FormControl('');
  teamAddress = new FormControl('');
  teamDescription = new FormControl('');
  clubName = new FormControl('');

  submit() {
    const data: any = {
      teamName: this.teamName.value,
      teamAddress: this.teamAddress.value,
      teamDescription: this.teamDescription.value,
      clubName: this.clubName.value,
    };

    this.dialogRef.close(data);
  }
}
