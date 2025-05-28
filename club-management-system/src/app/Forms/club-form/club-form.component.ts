import { Component, inject } from '@angular/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ClubService } from '../../services/club/club.service';

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
      <label for="fileInput">Upload Club Image</label>
      <input id="fileInput" type="file" (change)="onFileSelected($event)" />

      <!-- <mat-checkbox>Hide required marker</mat-checkbox> -->
      <div class="button-container">
        <button mat-raised-button (click)="submit()">Save Details</button>
      </div>
    </div>
  `,
  styleUrl: './club-form.component.css',
})
export class ClubFormComponent {
  onFileSelected($event: Event) {
    const input = $event.target as HTMLInputElement;

    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
      console.log('Selected file:', this.selectedFile);
    }

    const clubId = 'YOUR_CLUB_ID_HERE'; // Replace or get dynamically

    this.clubService.uploadClubImage(clubId, this.selectedFile).subscribe({
      next: (res) => {
        console.log('Image uploaded successfully', res.imageUrl);
        // Optionally update UI or model with res.imageUrl
      },
      error: (err) => {
        console.error('Image upload failed', err);
      },
    });
  }
  constructor(private dialogRef: MatDialogRef<ClubFormComponent>) {}

  clubService: ClubService = inject(ClubService);

  clubName = new FormControl('');
  clubAddress = new FormControl('');
  clubDescription = new FormControl('');
  selectedFile: File | undefined;

  submit() {
    const data: any = {
      clubName: this.clubName.value,
      clubAddress: this.clubAddress.value,
      clubDescription: this.clubDescription.value,
    };
    const clubData = {
      name: this.clubName.value || undefined,
      shortName: this.clubName.value || undefined, // You may want to split this later
      address: this.clubAddress.value || undefined,
      description: this.clubDescription.value || undefined,
      countryCode: 'US', // or make this dynamic
      activated: true,
    };

    // this.dialogRef.close(data);
    this.clubService.createClub(clubData).subscribe({
      next: (response) => {
        console.log('Club created:', response);
        this.dialogRef.close(response); // Optionally pass the created club back
      },
      error: (error) => {
        console.error('Error creating club:', error);
      },
    });
  }
}
