import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FieldCardComponent } from '../Components/field-card/field-card.component';
import { TeamCardComponent } from '../Components/team-card/team-card.component';
import { MatTabsModule } from '@angular/material/tabs';
import { FieldData } from '../Data/field-data';
import { TeamData } from '../Data/team-data';
import { ActivatedRoute } from '@angular/router';
import { FieldService, Field } from '../services/field/field.service';
import { TeamService, Team } from '../services/team/team.service';

@Component({
  selector: 'app-field-team-tabs',
  imports: [MatTabsModule, FieldCardComponent, TeamCardComponent, CommonModule],
  template: `
    <mat-tab-group>
      <mat-tab label="Fields">
        <div class="tab-content">
          <app-field-card
            *ngFor="let field of fieldData"
            [fieldData]="field"
          ></app-field-card>
        </div>
      </mat-tab>
      <mat-tab label="Teams">
        <div class="tab-content">
          <app-team-card
            *ngFor="let team of teamData"
            [teamData]="team"
          ></app-team-card>
        </div>
      </mat-tab>
    </mat-tab-group>
  `,
  styleUrl: './field-team-tabs.component.css',
})
export class FieldTeamTabsComponent {
  route: ActivatedRoute = inject(ActivatedRoute);
  // fieldData = FieldData;
  // teamData = TeamData;

  fieldData: Field[] | undefined;
  teamData: Team[] | undefined;

  fieldService = inject(FieldService);
  teamService = inject(TeamService);

  constructor() {
    const clubId = Number(this.route.snapshot.params['id']);

    this.fieldData = this.fieldService.getFieldsByClubId(clubId);
    this.teamData = this.teamService.getTeamsByClubId(clubId);
  }
}
