import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AllCommunityModule, ColDef, ModuleRegistry } from 'ag-grid-community';
import { AgGridAngular } from 'ag-grid-angular'; // Angular Data Grid Component
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDialog } from '@angular/material/dialog';
import { TeamData } from '../Data/team-data';
import { TeamFormComponent } from '../team-form/team-form.component';

ModuleRegistry.registerModules([AllCommunityModule]);

@Component({
  selector: 'app-teams',
  imports: [AgGridAngular, CommonModule, MatButtonModule, MatDialogModule],
  template: `
    <div class="button-container">
      <button mat-raised-button (click)="openDialog()">Add Team</button>
    </div>

    <!-- The AG Grid component -->
    <ag-grid-angular
      class="ag-theme-alpine"
      [rowData]="rowData"
      [columnDefs]="colDefs"
    />
  `,
  styleUrl: './teams.component.css',
})
export class TeamsComponent {
  constructor(private dialogRef: MatDialog) {}

  openDialog() {
    this.dialogRef.open(TeamFormComponent, {
      width: '500px',
      height: 'auto',
      maxWidth: '90vw',
      panelClass: 'custom-dialog-container',
    });
  }
  teamData = TeamData;

  rowData: any[] = [];
  // Row Data: The data to be displayed.
  ngOnInit() {
    this.rowData = this.teamData.map((team) => ({
      Name: team.team_name,
      Address: team.team_address,
      Club: team.club_name,
      Admin: team.team_admin,
    }));
  }

  // Column Definitions: Defines the columns to be displayed.
  colDefs: ColDef[] = [
    { field: 'Name' },
    { field: 'Address' },
    { field: 'Club' },
    {
      field: 'Admin',
      editable: true,
      cellEditor: 'agSelectCellEditor',
      cellEditorParams: {
        values: this.teamData.map((team) => team.team_admin),
      },
    },
  ];
}
