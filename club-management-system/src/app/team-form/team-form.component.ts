import { Component } from '@angular/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';

@Component({
  standalone: true,
  selector: 'app-team-form',
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
        <mat-label> Team Name</mat-label>
        <input matInput placeholder="Enter team name" />
      </mat-form-field>
      <mat-form-field>
        <mat-label> Team Address</mat-label>
        <input matInput placeholder="Enter team address" />
      </mat-form-field>
      <mat-form-field>
        <mat-label> Team Description</mat-label>
        <input matInput placeholder="Enter team description" />
      </mat-form-field>
      <mat-form-field>
        <mat-label> Club Name</mat-label>
        <input matInput placeholder="Enter club name" />
      </mat-form-field>
      <!-- <mat-checkbox>Has Lighting</mat-checkbox> -->
      <div class="button-container">
        <button mat-raised-button>Save Details</button>
      </div>
    </div>
  `,
  styleUrl: './team-form.component.css',
})
export class TeamFormComponent {}
