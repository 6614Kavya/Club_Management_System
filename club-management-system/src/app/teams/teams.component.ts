import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  AllCommunityModule,
  ColDef,
  ModuleRegistry,
  RowSelectionOptions,
} from 'ag-grid-community';
import { AgGridAngular } from 'ag-grid-angular'; // Angular Data Grid Component
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDialog } from '@angular/material/dialog';
import { TeamData } from '../Data/team-data';
import { TeamFormComponent } from '../Forms/team-form/team-form.component';
import { DeletePopupComponent } from '../Components/delete-popup/delete-popup.component';
import { EditComponentComponent } from '../Components/edit-component/edit-component.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

ModuleRegistry.registerModules([AllCommunityModule]);

@Component({
  selector: 'app-teams',
  imports: [
    AgGridAngular,
    CommonModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    ReactiveFormsModule,
  ],
  template: `
    <mat-form-field>
      <mat-label> Find Team</mat-label>
      <!-- <input
          matInput
          placeholder="Enter Club admin"
          [formControl]="clubAdmin"
        /> -->
      <mat-select [formControl]="teamName">
        @for (team of teamNames; track teamName) {
        <mat-option [value]="team">{{ team }}</mat-option>
        }
      </mat-select>
    </mat-form-field>
    <div class="button-container">
      <button mat-raised-button (click)="openDialog()">Add Team</button>
      <button
        class="remove"
        mat-raised-button
        (click)="openDeleteconfirmationDialog()"
      >
        Remove Selected User
      </button>
    </div>

    <!-- The AG Grid component -->
    <ag-grid-angular
      class="ag-theme-alpine"
      [rowData]="rowData"
      [columnDefs]="colDefs"
      [rowSelection]="rowSelection"
      [rowMultiSelectWithClick]="true"
      (gridReady)="onGridReady($event)"
    />
  `,
  styleUrl: './teams.component.css',
})
export class TeamsComponent {
  constructor(private dialogRef: MatDialog) {}

  @ViewChild('agGrid') agGrid!: AgGridAngular; // Access the grid component

  private gridApi: any; // Store API reference

  teamNames = TeamData.map((team) => team.team_name);

  teamName = new FormControl<string>('');

  rowSelection: RowSelectionOptions | 'single' | 'multiple' = {
    mode: 'multiRow',
  };

  isDeletionConfirmed: boolean = false;

  onGridReady(params: any) {
    this.gridApi = params.api; // Store API when grid is ready
  }

  openDialog() {
    const dialogRef = this.dialogRef.open(TeamFormComponent, {
      width: '500px',
      height: 'auto',
      maxWidth: '90vw',
      panelClass: 'custom-dialog-container',
    });

    dialogRef.afterClosed().subscribe((data) => {
      console.log(data);
      this.addNewTeam(
        data.teamName,
        data.teamAddress,
        data.teamDescription,
        data.clubName
      );
    });
  }
  teamData = TeamData;

  rowData: any[] = [];
  // Row Data: The data to be displayed.
  ngOnInit() {
    this.generateRowData(); // Load all data initially

    // Listen to changes in the selected club
    this.teamName.valueChanges.subscribe((selectedTeam: any) => {
      this.filterDataByTeam(selectedTeam);
    });
  }

  generateRowData() {
    this.rowData = this.teamData.map((team) => ({
      Name: team.team_name,
      Address: team.team_address,
      Club: team.club_name,
      Admin: team.team_admin, //check
    }));
  }

  filterDataByTeam(selectedTeam: string) {
    if (selectedTeam) {
      this.rowData = this.teamData
        .filter((team) => team.team_name === selectedTeam)
        .map((team) => ({
          Name: team.team_name,
          Address: team.team_address,
          Club: team.club_name,
          Admin: team.team_admin, //check
        }));
    } else {
      this.generateRowData(); // Reset to all data if no club is selected
    }

    // Update the AG Grid with the new filtered data
    if (this.gridApi) {
      this.gridApi.setRowData(this.rowData);
    }
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
    {
      field: '',
      headerName: '',
      cellRenderer: EditComponentComponent,
      width: 100,
      cellRendererParams: {
        updateTeamData: (event: any) => this.handleUpdatedTeam(event),
        section: 'Team',
      },
    },
  ];

  openDeleteconfirmationDialog() {
    const dialogRef = this.dialogRef.open(DeletePopupComponent, {
      width: '500px',
      height: 'auto',
      maxWidth: '90vw',
      panelClass: 'custom-dialog-container',
    });

    dialogRef.afterClosed().subscribe((data) => {
      if (data === true) {
        this.isDeletionConfirmed = true;
        if (this.gridApi) {
          const selectedRows = this.gridApi.getSelectedRows();
          // Filter out selected rows from rowData
          this.rowData = this.rowData.filter(
            (row) => !selectedRows.includes(row)
          );
          // Refresh the grid with the updated data
          this.gridApi.setRowData(this.rowData);
          console.log('Selected Rows:', selectedRows);
        } else {
          console.error('Grid API is not initialized.');
        }
      }
    });
  }

  addNewTeam(
    teamName: string,
    teamAddress: string,
    teamDescription: string,
    clubName: string
  ) {
    this.teamData.push({
      id: 1,
      team_name: teamName,
      team_address: teamAddress,
      team_admin: '',
      club_name: clubName,
    });

    this.rowData = [
      ...this.teamData.map((team) => ({
        Name: team.team_name,
        Address: team.team_address,
        Club: team.club_name,
        Admin: team.team_admin,
      })),
    ];
  }

  handleUpdatedTeam(event: any) {
    const { rowIndex, teamName, teamAddress, clubName, admins } = event;

    if (this.gridApi) {
      const rowNode = this.gridApi.getDisplayedRowAtIndex(rowIndex);
      if (rowNode) {
        rowNode.setDataValue('Name', teamName);
        rowNode.setDataValue('Address', teamAddress);
        rowNode.setDataValye('Club', clubName);
        rowNode.setDataValue('Admin', admins.join(', '));
      }
    }

    // Update the clubData array
    const team = this.teamData.find((t) => t.team_name === teamName);
    if (team) {
      team.team_name = teamName;
      team.team_address = teamAddress;
      team.club_name = clubName;
      team.team_admin = admins;
    }
  }
}
