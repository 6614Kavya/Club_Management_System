import { Component, inject, Inject, OnInit } from '@angular/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
// import { ClubData } from '../../Data/club-data';
import { Club, ClubService } from '../services/club/club.service';
import { UserService } from '../user.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-my-club',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatCheckboxModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
  ],
  template: `
    <div class="container">
      <ng-container *ngIf="isClubAdmin">
        <mat-form-field>
          <mat-label> Club Name</mat-label>
          <input
            matInput
            placeholder="Enter Club name"
            [formControl]="clubName"
          />
        </mat-form-field>
        <mat-form-field>
          <mat-label> Club Address</mat-label>
          <input
            matInput
            placeholder="Enter Club address"
            [formControl]="clubAddress"
          />
        </mat-form-field>
        <mat-form-field>
          <mat-label> Club Address</mat-label>
          <input
            matInput
            placeholder="Enter Club address"
            [formControl]="clubAddress"
          />
        </mat-form-field>
      </ng-container>

      <div class="button-container">
        <button mat-raised-button (click)="submit()">Save Details</button>
      </div>
    </div>
  `,
  styleUrl: './my-club.component.css',
})
export class MyClubComponent {
  constructor(
    // private dialogRef: MatDialogRef<MyOrganizationComponent>,
    // @Inject(MAT_DIALOG_DATA)
    // public data: {
    //   clubId: any;
    //   clubName: string;
    //   clubAddress: string;
    //   admins: string[];
    // },
    private clubService: ClubService,
    private userService: UserService
  ) {
    this.isClubAdmin = this.userService.isClubAdmin();

    console.log('Role flags:', {
      isClubAdmin: this.isClubAdmin,
    });
    // console.log('Dialog data:', data);

    // this.clubName.setValue(data.clubName);
    // this.clubAddress.setValue(data.clubAddress);
    // this.clubAdmin.setValue(data.admins ?? []);

    // this.availableAdmins = data.admins;
    // this.existingAdmins = ClubData.map((admin:any) => admin.admins);

    // Merge and remove duplicates
    this.allAdmins = [
      ...new Set([...this.availableAdmins, ...this.existingAdmins.flat()]),
    ];
  }
  existingAdmins: string[][] = [];
  availableAdmins: string[] = [];
  allAdmins: string[] = [];
  clubName = new FormControl('');
  clubAddress = new FormControl('');
  clubAdmin = new FormControl<string[]>([]);

  isClubAdmin = false;
  contextId: string | null = null;

  ngOnInit(): void {
    this.isClubAdmin = this.userService.isClubAdmin();
    this.contextId = this.userService.getContextId();

    if (this.isClubAdmin && this.contextId) {
      this.clubService.getClubById(this.contextId).subscribe({
        next: (club: Club) => {
          this.clubName.setValue(club.name ?? '');
          this.clubAddress.setValue(club.address ?? '');
          this.clubAdmin.setValue(club.clubAdmins ?? []);

          // Store admins for UI (e.g., to display as options)
          this.availableAdmins = club.clubAdmins ?? [];

          // Merge existing + available and remove duplicates
          this.allAdmins = [
            ...new Set([
              ...this.availableAdmins,
              ...this.existingAdmins.flat(),
            ]),
          ];
        },
        error: (err) => {
          console.error('Failed to load club details:', err);
        },
      });
    }
  }
  submit() {
    // Emit the updated club data, including the selected admins.
    // this.dialogRef.close({
    //   clubName: this.clubName.value,
    //   clubAddress: this.clubAddress.value,
    //   admins: this.clubAdmin.value,
    // });

    const updatedData = {
      name: this.clubName.value || undefined,
      address: this.clubAddress.value || undefined,
      clubAdmins: this.clubAdmin.value || undefined,
    };

    if (this.contextId) {
      this.clubService.updateClub(this.contextId, updatedData).subscribe({
        next: (res: any) => {
          console.log('Club updated successfully', res);
        },
        error: (err: any) => {
          console.error('Error updating club', err);
        },
      });
    }
  }
}
