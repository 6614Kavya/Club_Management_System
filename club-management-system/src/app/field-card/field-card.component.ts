import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { FieldData } from '../Data/field-data';
import { Router } from '@angular/router';

interface FieldData {
  id: number;
  field_name: string;
  field_address: string;
  club_name: string;
  field_admin: string[];
  description: string;
  facilities: string[];
}

@Component({
  selector: 'app-field-card',
  imports: [MatCardModule, MatButtonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <mat-card appearance="outlined" (click)="onCardClick()">
      <mat-card-header>
        <mat-card-title>{{ fieldData.field_name }}</mat-card-title>
        <!-- <mat-card-subtitle>{{ clubData.short_name }}</mat-card-subtitle> -->
      </mat-card-header>
      <img src="" alt="" />
      <mat-card-content>
        <p>{{ fieldData.description }}</p>
      </mat-card-content>
      <mat-card-actions>
        <!-- <button mat-button>LIKE</button> -->
        <button mat-button>Details</button>
      </mat-card-actions>
    </mat-card>
  `,
  styleUrl: './field-card.component.css',
})
export class FieldCardComponent {
  constructor(private router: Router) {}
  onCardClick() {
    // this.router.navigate(['/dashboard/fieldTeamData']);
  }
  @Input() fieldData!: FieldData;
}
