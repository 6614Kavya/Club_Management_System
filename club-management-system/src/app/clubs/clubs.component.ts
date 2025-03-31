import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDialog } from '@angular/material/dialog';

import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community';
import { AgGridAngular } from 'ag-grid-angular'; // Angular Data Grid Component
import type { ColDef, RowSelectionOptions } from 'ag-grid-community'; // Column Definition Type Interface
import { ClubData, ClubAdmins } from '../Data/club-data';
import { ClubFormComponent } from '../club-form/club-form.component';
import { AdminSelectDropdownComponent } from '../admin-select-dropdown/admin-select-dropdown.component';
import { DeletePopupComponent } from '../delete-popup/delete-popup.component';
import { EditComponentComponent } from '../edit-component/edit-component.component';

ModuleRegistry.registerModules([AllCommunityModule]);

@Component({
  selector: 'app-clubs',
  imports: [AgGridAngular, CommonModule, MatButtonModule, MatDialogModule],
  template: `
    <div class="button-container">
      <button mat-raised-button (click)="openDialog()">Add Club</button>
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
  styleUrl: './clubs.component.css',
})
export class ClubsComponent {
  constructor(private dialogRef: MatDialog) {}
  @ViewChild('agGrid') agGrid!: AgGridAngular; // Access the grid component

  private gridApi: any; // Store API reference

  rowSelection: RowSelectionOptions | 'single' | 'multiple' = {
    mode: 'multiRow',
  };

  isDeletionConfirmed: boolean = false;

  onGridReady(params: any) {
    this.gridApi = params.api; // Store API when grid is ready
  }

  openDialog() {
    const dialogRef = this.dialogRef.open(ClubFormComponent, {
      width: '500px',
      height: 'auto',
      maxWidth: '90vw',
      panelClass: 'custom-dialog-container',
    });

    dialogRef.afterClosed().subscribe((data) => {
      console.log(data);
      this.addNewClub(data.clubName, data.clubAddress, data.clubDescription);
    });
  }

  openAdminDropdown(clubName: string, params?: any, action?: 'add' | 'remove') {
    const dialogRef = this.dialogRef.open(AdminSelectDropdownComponent, {
      width: '500px',
      height: 'auto',
      maxWidth: '90vw',
      panelClass: 'custom-dialog-container',
      data: { clubName: clubName, admins: this.clubAdmins }, //passes data to AdminSelectDropdownComponent
    });

    //returns the data that was passed when dialogRef.close(data) is called inside the dialog component.
    dialogRef.afterClosed().subscribe((data) => {
      if (action === 'add') {
        data.forEach((admin: any) => this.addAdmin(clubName, admin, params));
      } else if (action === 'remove') {
        this.removeAdmin(clubName, data, params);
      }
      this.generateRowData(); // Refresh rowData
      // console.log(data);
      // this.addAdmin(clubName, data);
    });
  }
  clubData = ClubData;
  clubAdmins = ClubAdmins;
  rowData: any[] = [];
  // Row Data: The data to be displayed.

  generateRowData() {
    this.rowData = this.clubData.map((club) => ({
      Name: club.club_name,
      Address: club.address,
      Admin: club.admins.join(','),
    }));
  }

  // Function to add a new admin dynamically
  addAdmin(clubName: string, newAdmin: string, params?: any) {
    // Find the club in the ClubData array
    const club = this.clubData.find((c) => c.club_name === clubName);
    if (club) {
      club.admins.push(newAdmin); // Add new admin to the data structure

      // Update the row immediately
      if (params && this.gridApi) {
        const updatedClub = this.clubData.find((c) => c.club_name === clubName);
        if (updatedClub) {
          params.node.setDataValue('Admin', updatedClub.admins.join(', '));
        }
      }
      this.generateRowData(); // Refresh rowData
    }
  }

  removeAdmin(clubName: string, selectedAdmins: string[], params?: any) {
    const club = this.clubData.find((c) => c.club_name === clubName);
    if (club) {
      club.admins = club.admins.filter(
        (admin) => !selectedAdmins.includes(admin)
      );

      // Update the row immediately
      if (params && this.gridApi) {
        const updatedClub = this.clubData.find((c) => c.club_name === clubName);
        if (updatedClub) {
          params.node.setDataValue('Admin', updatedClub.admins.join(', '));
        }
      }
      this.generateRowData(); // Refresh rowData
    }
  }

  ngOnInit() {
    //
    this.generateRowData();
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
      // onCellClicked: (event: any) => {
      //   const clubName = event.data.Name;
      //   if (clubName) {
      //     const newAdmin = prompt(`Enter new admin for ${clubName}:`);
      //     if (newAdmin) {
      //       this.addAdmin(clubName, newAdmin);
      //     }
      //   }
      // },
      // onCellClicked: (event: any) => {
      //   this.openAdminDropdown(event.data.Name);
      // },
    },
    {
      field: '',
      headerName: '',
      cellRenderer: (params: any) => {
        const button = document.createElement('button');
        button.innerText = 'Add Admin';

        // Add CSS class for styling
        button.classList.add('add-button');

        button.addEventListener('click', () =>
          this.openAdminDropdown(params.data.Name, params, 'add')
        );
        return button;
      },
      width: 150,
    },

    {
      field: '',
      headerName: '',
      cellRenderer: (params: any) => {
        const button = document.createElement('button');
        button.innerText = 'Remove Admin';

        // Add CSS class for styling
        button.classList.add('remove-button');

        button.addEventListener('click', () =>
          this.openAdminDropdown(params.data.Name, params, 'remove')
        );
        return button;
      },
      width: 150,
    },
    {
      field: '',
      headerName: 'Actions',
      cellRenderer: EditComponentComponent, // ✅ Use the fixed component
      width: 100,
    },
  ];
  // enableCellSpan = true;

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

  addNewClub(clubName: string, clubAddress: string, clubDescription: string) {
    this.clubData.push({
      club_name: clubName,
      address: clubAddress,
      admins: [''],
    });

    this.rowData = [
      ...this.clubData.map((club) => ({
        Name: club.club_name,
        Address: club.address,
        Admin: club.admins,
      })),
    ];
  }
}
