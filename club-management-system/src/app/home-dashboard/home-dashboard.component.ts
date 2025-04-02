import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClubCardComponent } from '../Components/club-card/club-card.component';
import { ClubData } from '../Data/club-data';

@Component({
  selector: 'app-home-dashboard',
  imports: [ClubCardComponent, CommonModule],
  template: `
    <div class="club-container">
      <app-club-card
        *ngFor="let club of clubData"
        [clubData]="club"
      ></app-club-card>
    </div>
  `,
  styleUrl: './home-dashboard.component.css',
})
export class HomeDashboardComponent {
  clubData = ClubData;
}
