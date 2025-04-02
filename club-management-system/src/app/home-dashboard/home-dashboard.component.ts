import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClubCardComponent } from '../Components/club-card/club-card.component';
import { ClubData } from '../Data/club-data';
import { ClubService, Club } from '../services/club/club.service';

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
  // clubData = ClubData;
  clubData: Club[] = [];
  clubService: ClubService = inject(ClubService);
  constructor() {
    this.clubData = this.clubService.getAllClubList();
  }
}
