import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDialog } from '@angular/material/dialog';

import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community';
import { AgGridAngular } from 'ag-grid-angular'; // Angular Data Grid Component
import type { ColDef } from 'ag-grid-community'; // Column Definition Type Interface
import { ClubData } from '../Data/club-data';
import { ClubFormComponent } from '../club-form/club-form.component';

ModuleRegistry.registerModules([AllCommunityModule]);

@Component({
  selector: 'app-clubs',
  imports: [AgGridAngular, CommonModule, MatButtonModule, MatDialogModule],
  template: `
    <div class="button-container">
      <button mat-raised-button (click)="openDialog()">Add Club</button>
    </div>

    <!-- The AG Grid component -->
    <ag-grid-angular
      class="ag-theme-alpine"
      [rowData]="rowData"
      [columnDefs]="colDefs"
    />
  `,
  styleUrl: './clubs.component.css',
})
export class ClubsComponent {
  constructor(private dialogRef: MatDialog) {}

  openDialog() {
    this.dialogRef.open(ClubFormComponent, {
      width: '500px',
      height: 'auto',
      maxWidth: '90vw',
      panelClass: 'custom-dialog-container',
    });
  }
  clubData = ClubData;
  rowData: any[] = [];
  // Row Data: The data to be displayed.
  ngOnInit() {
    this.rowData = this.clubData.flatMap((club) => {
      const rows = {
        Name: club.club_name,
        Address: club.address,
        Admin: club.admins[0],
      };
      const adminRows = club.admins.slice(1).map((admin) => ({
        Name: '',
        Address: '',
        Admin: admin,
      }));
      return [rows, ...adminRows];
    });
  }

  // Column Definitions: Defines the columns to be displayed.
  colDefs: ColDef[] = [
    { field: 'Name' },
    { field: 'Address' },
    {
      field: 'Admin',
      editable: true,
      cellEditor: 'agSelectCellEditor',
      cellEditorParams: {
        values: this.clubData.map((club) => club.admins),
      },
    },
  ];
}
