import { Component, inject, Inject, OnInit } from '@angular/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
// import { ClubData } from '../../Data/club-data';
import { ClubService } from '../services/club/club.service';
import { UserService } from '../user.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-my-team',
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
      <ng-container *ngIf="isTeamManager">
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
          <mat-label> Team Address</mat-label>
          <input
            matInput
            placeholder="Enter Team address"
            [formControl]="teamAddress"
          />
        </mat-form-field>
        <mat-form-field>
          <mat-label> Team Description</mat-label>
          <!-- <input
          matInput
          placeholder="Enter Club admin"
          [formControl]="clubAdmin"
        /> -->
          <mat-select [formControl]="teamManager" multiple>
            @for (admin of allAdmins; track teamManager) {
            <mat-option [value]="admin">{{ admin }}</mat-option>
            }
          </mat-select>
        </mat-form-field>
      </ng-container>

      <div class="button-container">
        <button mat-raised-button (click)="submit()">Save Details</button>
      </div>
    </div>
  `,
  styleUrl: './my-team.component.css',
})
export class MyTeamComponent {
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
    this.isTeamManager = this.userService.isTeamManager();

    console.log('Role flags:', {
      isTeamManager: this.isTeamManager,
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
  teamName = new FormControl('');
  teamAddress = new FormControl('');
  teamManager = new FormControl<string[]>([]);

  isTeamManager = false;
  contextId: string | null = null;

  // ngOnInit() {
  //   this.isClubAdmin = this.userService.isClubAdmin();
  //   this.isFieldAdmin = this.userService.isFieldAdmin();
  //   this.isTeamManager = this.userService.isTeamManager();
  //   this.contextId = this.userService.getContextId();

  //   console.log('Role flags:', {
  //     isClubAdmin: this.isClubAdmin,
  //     isFieldAdmin: this.isFieldAdmin,
  //     isTeamManager: this.isTeamManager,
  //   });
  // }
  submit() {
    // Emit the updated club data, including the selected admins.
    // this.dialogRef.close({
    //   clubName: this.clubName.value,
    //   clubAddress: this.clubAddress.value,
    //   admins: this.clubAdmin.value,
    // });

    const updatedData = {
      name: this.teamName.value || undefined,
      address: this.teamAddress.value || undefined,
      clubAdmins: this.teamManager.value || undefined,
    };

    // this.clubService.updateClub(this.data.clubId, updatedData).subscribe({
    //   next: (res: any) => {
    //     console.log('Club updated successfully', res);
    //     this.dialogRef.close(true); // signal success to the caller
    //   },
    //   error: (err: any) => {
    //     console.log(this.data.clubId);
    //     console.error('Error updating club', err);
    //   },
    // });
  }
}
