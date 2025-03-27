import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDialog } from '@angular/material/dialog';

import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community';
import { AgGridAngular } from 'ag-grid-angular'; // Angular Data Grid Component
import type { ColDef } from 'ag-grid-community'; // Column Definition Type Interface
import { ClubData, ClubAdmins } from '../Data/club-data';
import { ClubFormComponent } from '../club-form/club-form.component';
import { AdminSelectDropdownComponent } from '../admin-select-dropdown/admin-select-dropdown.component';

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

  openAdminDropdown(clubName: string) {
    const dialogRef = this.dialogRef.open(AdminSelectDropdownComponent, {
      width: '500px',
      height: 'auto',
      maxWidth: '90vw',
      panelClass: 'custom-dialog-container',
      data: { clubName: clubName, admins: this.clubAdmins }, //passes data to AdminSelectDropdownComponent
    });

    //returns the data that was passed when dialogRef.close(data) is called inside the dialog component.
    dialogRef.afterClosed().subscribe((data) => {
      console.log(data);
      this.addAdmin(clubName, data);
    });
  }
  clubData = ClubData;
  clubAdmins = ClubAdmins;
  rowData: any[] = [];
  // Row Data: The data to be displayed.

  generateRowData() {
    this.rowData = this.clubData.flatMap((club) => {
      const firstRow = {
        Name: club.club_name,
        Address: club.address,
        Admin: club.admins[0] || '', // First admin
      };
      const adminRows = club.admins.slice(1).map((admin) => ({
        Name: '',
        Address: '',
        Admin: admin,
      }));
      return [firstRow, ...adminRows];
    });
  }

  // Function to add a new admin dynamically
  addAdmin(clubName: string, newAdmin: string) {
    // Find the club in the ClubData array
    const club = this.clubData.find((c) => c.club_name === clubName);
    if (club) {
      club.admins.push(newAdmin); // Add new admin to the data structure
      this.generateRowData(); // Refresh rowData
    }
  }
  ngOnInit() {
    //
    this.generateRowData();
  }

  // Column Definitions: Defines the columns to be displayed.
  colDefs: ColDef[] = [
    { field: 'Name', spanRows: true },
    { field: 'Address', spanRows: true },
    {
      field: 'Admin',
      editable: true,
      spanRows: true,
      cellEditor: 'agSelectCellEditor',
      cellEditorParams: {
        spanRows: true,
        values: this.clubData.map((club) => club.admins),
      },
      // onCellClicked: (event: any) => {
      //   const clubName = event.data.Name;
      //   if (clubName) {
      //     const newAdmin = prompt(`Enter new admin for ${clubName}:`);
      //     if (newAdmin) {
      //       this.addAdmin(clubName, newAdmin);
      //     }
      //   }
      // },
      onCellClicked: (event: any) => {
        this.openAdminDropdown(event.data.Name);
      },
    },
  ];
  enableCellSpan = true;
}
