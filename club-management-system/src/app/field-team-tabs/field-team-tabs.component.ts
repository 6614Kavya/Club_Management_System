import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FieldCardComponent } from '../field-card/field-card.component';
import { TeamCardComponent } from '../team-card/team-card.component';
import { MatTabsModule } from '@angular/material/tabs';
import { FieldData } from '../Data/field-data';
import { TeamData } from '../Data/team-data';

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
  fieldData = FieldData;
  teamData = TeamData;
}
