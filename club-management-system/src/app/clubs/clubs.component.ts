import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community';
import { AgGridAngular } from 'ag-grid-angular'; // Angular Data Grid Component
import type { ColDef } from 'ag-grid-community'; // Column Definition Type Interface
import { ClubData } from '../Data/club-data';

ModuleRegistry.registerModules([AllCommunityModule]);

@Component({
  selector: 'app-clubs',
  imports: [AgGridAngular, CommonModule],
  template: `
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
  clubData = ClubData;
  rowData: any[] = [];
  // Row Data: The data to be displayed.
  ngOnInit() {
    this.rowData = this.clubData.map((club) => ({
      Name: club.club_name,
      Address: club.address,
      Admin: club.admin,
    }));
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
        values: this.clubData.map((club) => club.admin),
      },
    },
  ];
}
