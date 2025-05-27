import { Component, inject, Inject, OnInit } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UserService, UserSummary } from '../../user.service';
import { CommonModule } from '@angular/common';
import { ClubService, Club } from '../../services/club/club.service';
import { FieldService, Field } from '../../services/field/field.service';
import { TeamService, Team } from '../../services/team/team.service';

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

    <ng-container *ngIf="isSuperAdmin">
      <mat-form-field appearance="fill">
        <mat-label>Select club</mat-label>
        <mat-select [formControl]="clubControl">
          <mat-option *ngFor="let club of clubs" [value]="club.id">
            {{ club.name }}
          </mat-option>
        </mat-select>
      </mat-form-field>
    </ng-container>

    <ng-container *ngIf="isFieldAdmin">
      <mat-form-field appearance="fill">
        <mat-label>Select field</mat-label>
        <mat-select [formControl]="fieldControl">
          <mat-option *ngFor="let field of fields" [value]="field.id">
            {{ field.name }}
          </mat-option>
        </mat-select>
      </mat-form-field>
    </ng-container>

    <ng-container *ngIf="isFieldAdmin">
      <mat-form-field appearance="fill">
        <mat-label>Select team</mat-label>
        <mat-select [formControl]="teamControl">
          <mat-option *ngFor="let team of teams" [value]="team.id">
            {{ team.name }}
          </mat-option>
        </mat-select>
      </mat-form-field>
    </ng-container>

    <button mat-button (click)="submitSelection()">OK</button>
  `,
  styleUrl: './admin-select-dropdown.component.css',
})
export class AdminSelectDropdownComponent implements OnInit {
  private userService = inject(UserService);
  private clubService = inject(ClubService);
  private fieldService = inject(FieldService);
  private teamService = inject(TeamService);

  userControl = new FormControl('');
  clubControl = new FormControl('');
  fieldControl = new FormControl('');
  filteredFieldControl = new FormControl('');
  teamControl = new FormControl('');
  filteredTeamControl = new FormControl('');

  users: UserSummary[] = [];
  clubs: Club[] = [];
  fields: Field[] = [];
  filteredFields: Field[] = [];
  teams: Team[] = [];
  filteredTeams: Team[] = [];

  isClubAdmin = false;
  isFieldAdmin = false;
  isTeamManager = false;
  isSuperAdmin = false;
  contextId: string | null = null;

  constructor(private dialogRef: MatDialogRef<AdminSelectDropdownComponent>) {
    // this.availableAdmins = data.admins;
  }
  // admins = new FormControl('');
  // availableAdmins: string[] = [];
  ngOnInit() {
    // get role and context
    this.isSuperAdmin = this.userService.isSuperAdmin();
    this.isClubAdmin = this.userService.isClubAdmin();
    this.isFieldAdmin = this.userService.isFieldAdmin();
    this.isTeamManager = this.userService.isTeamManager();
    this.contextId = this.userService.getContextId();

    this.userService.getAllUsers().subscribe({
      next: (data) => {
        this.users = data.result?.$values ?? []; // Safely extract the array
      },
      error: (err) => console.error('Failed to load users:', err),
    });

    // this.teamService.getAllTeams().subscribe({
    //   next: (data) => {
    //     this.teams = data;
    //     console.log('Teams', data);
    //   },
    //   error: (err) => console.error('Failed to load fields:', err),
    // });

    if (this.isSuperAdmin) {
      // Fetch clubs
      this.clubService.getAllClubs().subscribe({
        next: (data) => {
          this.clubs = data;
        },
        error: (err) => console.error('Failed to load clubs:', err),
      });
    } else if (this.isClubAdmin && this.contextId) {
      //Fetch fields
      this.fieldService.getAllFields().subscribe({
        next: (data) => {
          this.fields = data;
        },
        error: (err) => console.error('Failed to load fields:', err),
      });
    } else if (this.isClubAdmin) {
      //Fetch fields of a particular club
      this.fieldService.getFieldsByClubId(this.contextId).subscribe({
        next: (data) => {
          this.fields = data;
        },
        error: (err) => console.error('Failed to load fields for club:', err),
      });
    } else if (this.isFieldAdmin) {
      //Fetch teams
      this.teamService.getAllTeams().subscribe({
        next: (data) => {
          this.teams = data;
          console.log('Teams', data);
        },
        error: (err) => console.error('Failed to load fields:', err),
      });
    } else if (this.isTeamManager) {
      //fetch teams of a particular club
      this.teamService.getTeamsByClubId(this.contextId).subscribe({
        next: (data) => {
          this.teams = data;
        },
        error: (err) => console.error('Failed to load fields for club:', err),
      });
    }
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
