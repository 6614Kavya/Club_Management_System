import { Component, inject, Inject, OnInit } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UserService, UserSummary } from '../../user.service';
import { CommonModule } from '@angular/common';
import { ClubService, Club } from '../../services/club/club.service';

@Component({
  selector: 'app-admin-select-dropdown',
  imports: [
    MatFormFieldModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
  ],
  template: `
    <mat-form-field appearance="fill">
      <!-- <mat-label>Admins for {{ data.clubName }}</mat-label> -->
      <mat-label>Select user</mat-label>
      <mat-select [formControl]="userControl">
        <mat-option *ngFor="let user of users" [value]="user.userId">
          {{ user.name }}
        </mat-option>
      </mat-select>
    </mat-form-field>

    <mat-form-field appearance="fill">
      <mat-label>Select club</mat-label>
      <mat-select [formControl]="clubControl">
        <mat-option *ngFor="let club of clubs" [value]="club.id">
          {{ club.name }}
        </mat-option>
      </mat-select>
    </mat-form-field>
    <button mat-button (click)="submitSelection()">OK</button>
  `,
  styleUrl: './admin-select-dropdown.component.css',
})
export class AdminSelectDropdownComponent implements OnInit {
  private userService = inject(UserService);
  private clubService = inject(ClubService);

  userControl = new FormControl('');
  clubControl = new FormControl('');

  users: UserSummary[] = [];
  clubs: Club[] = [];

  constructor(private dialogRef: MatDialogRef<AdminSelectDropdownComponent>) {
    // this.availableAdmins = data.admins;
  }
  // admins = new FormControl('');
  // availableAdmins: string[] = [];
  ngOnInit() {
    this.userService.getAllUsers().subscribe({
      next: (data) => {
        this.users = data.result?.$values ?? []; // Safely extract the array
      },
      error: (err) => console.error('Failed to load users:', err),
    });

    // Fetch clubs
    this.clubService.getAllClubs().subscribe({
      next: (data) => {
        this.clubs = data;
      },
      error: (err) => console.error('Failed to load clubs:', err),
    });
  }

  submitSelection() {
    const selectedUserId = this.userControl.value;
    const selectedClubId = this.clubControl.value;

    const selectedUser = this.users.find((u) => u.userId === selectedUserId);
    const selectedClub = this.clubs.find((c) => c.id === selectedClubId);

    console.log('Selected user', selectedUser);
    console.log('Selected club', selectedClub);

    this.dialogRef.close({
      user: selectedUser,
      club: selectedClub,
    });
  }
}
