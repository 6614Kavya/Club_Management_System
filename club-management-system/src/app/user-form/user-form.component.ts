import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ClubData } from '../Data/club-data';
import { FieldData } from '../Data/field-data';
import { TeamData } from '../Data/team-data';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  standalone: true,
  selector: 'app-user-form',
  imports: [
    CommonModule,
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
        <mat-label> User's Name</mat-label>
        <input
          matInput
          placeholder="Enter User's name"
          [formControl]="userName"
        />
      </mat-form-field>
      <mat-form-field>
        <mat-label> User's Address</mat-label>
        <input
          matInput
          placeholder="Enter User's address"
          [formControl]="userAddress"
        />
      </mat-form-field>
      <mat-form-field>
        <mat-label>Select Role</mat-label>
        <mat-select [formControl]="userRole">
          @for (role of availableRoles; track userRole) {
          <mat-option [value]="role">{{ role }}</mat-option>
          }
        </mat-select>
      </mat-form-field>

      <!-- Displays club list if the selected role os Club admin -->
      <mat-form-field *ngIf="selectedRole === 'Club Admin'">
        <mat-label>Select Club</mat-label>
        <mat-select [formControl]="assignedClub">
          @for (club of availableClubs; track assignedClub) {
          <mat-option [value]="club">{{ club }}</mat-option>
          }
        </mat-select>
      </mat-form-field>

      <!-- Displays field list if the selected role os Field admin -->
      <mat-form-field *ngIf="selectedRole === 'Field Admin'">
        <mat-label>Select Field</mat-label>
        <mat-select [formControl]="assignedField">
          @for (field of availableFields; track assignedField) {
          <mat-option [value]="field">{{ field }}</mat-option>
          }
        </mat-select>
      </mat-form-field>

      <!-- Displays team list if the selected role os Team manager -->
      <mat-form-field *ngIf="selectedRole === 'Team Manager'">
        <mat-label>Select Team</mat-label>
        <mat-select [formControl]="assignedTeam">
          @for (team of availableTeams; track assignedTeam) {
          <mat-option [value]="team">{{ team }}</mat-option>
          }
        </mat-select>
      </mat-form-field>

      <div class="button-container">
        <button mat-raised-button (click)="submit()">Save Details</button>
      </div>
    </div>
  `,
  styleUrl: './user-form.component.css',
})
export class UserFormComponent {
  constructor(private dialogRef: MatDialogRef<UserFormComponent>) {}

  userName = new FormControl('');
  userAddress = new FormControl('');
  userRole = new FormControl('');
  assignedClub = new FormControl('');
  assignedField = new FormControl('');
  assignedTeam = new FormControl('');
  availableRoles: string[] = [
    'Super Admin',
    'Club Admin',
    'Field Admin',
    'Team Manager',
  ];
  // selectedRole = 'Super Admin';
  clubData = ClubData;
  fieldData = FieldData;
  teamData = TeamData;

  availableClubs: string[] = this.clubData.map((club) => club.club_name);
  availableFields: string[] = this.fieldData.map((field) => field.field_name);
  availableTeams: string[] = this.teamData.map((team) => team.team_name);

  // Getter to track selected role dynamically
  get selectedRole(): string | null {
    return this.userRole.value;
  }

  submit() {
    const data: any = {
      userName: this.userName.value,
      userAddress: this.userAddress.value,
      role: this.userRole.value,
    };

    if (this.selectedRole === 'Club Admin') {
      data.assignedClub = this.assignedClub.value;
    } else if (this.selectedRole === 'Field Admin') {
      data.assignedField = this.assignedField.value;
    } else if (this.selectedRole === 'Team Manager') {
      data.assignedTeam = this.assignedTeam.value;
    }

    this.dialogRef.close(data);
  }
}
