import { Component, Inject } from '@angular/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TeamData } from '../../Data/team-data';

@Component({
  selector: 'app-edit-team',
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
        <mat-label> Team Name</mat-label>
        <input
          matInput
          placeholder="Enter Team name"
          [formControl]="teamName"
        />
      </mat-form-field>
      <mat-form-field>
        <mat-label> Team Address</mat-label>
        <input
          matInput
          placeholder="Enter Team address"
          [formControl]="teamAddress"
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
        <mat-label> Team Admins</mat-label>
        <!-- <input
          matInput
          placeholder="Enter Club admin"
          [formControl]="clubAdmin"
        /> -->
        <mat-select [formControl]="teamAdmin" multiple>
          @for (admin of allAdmins; track teamAdmin) {
          <mat-option [value]="admin">{{ admin }}</mat-option>
          }
        </mat-select>
      </mat-form-field>

      <div class="button-container">
        <button mat-raised-button (click)="submit()">Save Details</button>
      </div>
    </div>
  `,
  styleUrl: './edit-team.component.css',
})
export class EditTeamComponent {
  constructor(
    private dialogRef: MatDialogRef<EditTeamComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      teamName: string;
      teamAddress: string;
      clubName: string;
      admins: string[];
    }
  ) {
    this.teamName.setValue(data.teamName);
    this.teamAddress.setValue(data.teamAddress);
    this.clubName.setValue(data.clubName);
    this.teamAdmin.setValue(data.admins ?? []);
    // this.clubName.setValue(data.clubName);
    // this.clubAddress.setValue(data.clubAddress);
    // this.clubAdmin.setValue(data.admins ?? []);

    this.availableAdmins = data.admins;
    this.existingAdmins = TeamData.map((admin) => admin.team_admin);

    // Merge and remove duplicates
    this.allAdmins = [
      ...new Set([...this.availableAdmins, ...this.existingAdmins.flat()]),
    ];
  }
  existingAdmins: string[] = [];
  availableAdmins: string[] = [];
  allAdmins: string[] = [];
  teamName = new FormControl('');
  teamAddress = new FormControl('');
  clubName = new FormControl('');
  teamAdmin = new FormControl<string[]>([]);

  submit() {
    // Emit the updated club data, including the selected admins.
    this.dialogRef.close({
      teamName: this.teamName.value,
      teamAddress: this.teamAddress.value,
      clubName: this.clubName.value,
      admins: this.teamAdmin.value,
    });
  }
}
