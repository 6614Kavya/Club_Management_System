import { Component } from '@angular/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';

@Component({
  standalone: true,
  selector: 'app-club-form',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatCheckboxModule,
    MatButtonModule,
  ],
  template: `
    <div class="container">
      <mat-form-field>
        <mat-label> Club Name</mat-label>
        <input matInput placeholder="Enter club name" />
      </mat-form-field>
      <mat-form-field>
        <mat-label> Club Address</mat-label>
        <input matInput placeholder="Enter club name" />
      </mat-form-field>
      <mat-form-field>
        <mat-label> Club Description</mat-label>
        <input matInput placeholder="Enter club name" />
      </mat-form-field>
      <!-- <mat-checkbox>Hide required marker</mat-checkbox> -->
      <div class="button-container">
        <button mat-raised-button>Save Details</button>
      </div>
    </div>
  `,
  styleUrl: './club-form.component.css',
})
export class ClubFormComponent {}
