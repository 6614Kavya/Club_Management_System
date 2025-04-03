import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { TeamData } from '../../Data/team-data';
import { Router } from '@angular/router';
import { TeamService, Team } from '../../services/team/team.service';

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
      <img mat-card-image [src]="teamData.team_logo" alt="" />
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
  @Input() teamData!: Team;
}
