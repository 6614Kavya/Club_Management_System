import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { ClubData } from '../../Data/club-data';
import { Router } from '@angular/router';

interface ClubData {
  id: number;
  club_name: string;
  short_name: string;
  club_description: string;
  club_address: string;
  country_code: string;
  activated: boolean;
  club_admins: string[];
}

@Component({
  selector: 'app-club-card',
  imports: [MatCardModule, MatButtonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <mat-card appearance="outlined" (click)="onCardClick()">
      <mat-card-header>
        <mat-card-title>{{ clubData.club_name }}</mat-card-title>
        <mat-card-subtitle>{{ clubData.short_name }}</mat-card-subtitle>
      </mat-card-header>
      <img src="" alt="" />
      <mat-card-content>
        <p>{{ clubData.club_description }}</p>
      </mat-card-content>
      <mat-card-actions>
        <!-- <button mat-button>LIKE</button> -->
        <button mat-button>Details</button>
      </mat-card-actions>
    </mat-card>
  `,
  styleUrl: './club-card.component.css',
})
export class ClubCardComponent {
  constructor(private router: Router) {}
  onCardClick() {
    this.router.navigate(['/dashboard/fieldTeamData', this.clubData.id]);
  }
  @Input() clubData!: ClubData;
}
