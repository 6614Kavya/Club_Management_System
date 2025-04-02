import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { TeamData } from '../Data/team-data';
import { Router } from '@angular/router';

interface TeamData {
  id: number;
  team_name: string;
  team_address: string;
  team_admin: string;
  club_name: string;
}

@Component({
  selector: 'app-team-card',
  imports: [MatCardModule, MatButtonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <mat-card appearance="outlined" (click)="onCardClick()">
      <mat-card-header>
        <mat-card-title>{{ teamData.team_name }}</mat-card-title>
        <!-- <mat-card-subtitle>{{ clubData.short_name }}</mat-card-subtitle> -->
      </mat-card-header>
      <img src="" alt="" />
      <mat-card-content>
        <p>{{ teamData.team_address }}</p>
      </mat-card-content>
      <mat-card-actions>
        <!-- <button mat-button>LIKE</button> -->
        <button mat-button>Details</button>
      </mat-card-actions>
    </mat-card>
  `,
  styleUrl: './team-card.component.css',
})
export class TeamCardComponent {
  constructor(private router: Router) {}
  onCardClick() {
    // this.router.navigate(['/dashboard/fieldTeamData']);
  }
  @Input() teamData!: TeamData;
}
