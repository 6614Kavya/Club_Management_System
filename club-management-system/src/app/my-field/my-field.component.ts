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
  selector: 'app-my-field',
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
      <ng-container *ngIf="isFieldAdmin">
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
          <mat-label> Field Address</mat-label>
          <input
            matInput
            placeholder="Enter Field address"
            [formControl]="fieldAddress"
          />
        </mat-form-field>
        <mat-form-field>
          <mat-label> Field Description</mat-label>
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
      </ng-container>

      <div class="button-container">
        <button mat-raised-button (click)="submit()">Save Details</button>
      </div>
    </div>
  `,
  styleUrl: './my-field.component.css',
})
export class MyFieldComponent {
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
    this.isFieldAdmin = this.userService.isFieldAdmin();

    console.log('Role flags:', {
      isFieldAdmin: this.isFieldAdmin,
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
  fieldName = new FormControl('');
  fieldAddress = new FormControl('');
  fieldAdmin = new FormControl<string[]>([]);

  isFieldAdmin = false;
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
      name: this.fieldName.value || undefined,
      address: this.fieldAddress.value || undefined,
      clubAdmins: this.fieldAdmin.value || undefined,
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
