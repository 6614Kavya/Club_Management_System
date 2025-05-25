import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community';
import { AgGridAngular } from 'ag-grid-angular'; // Angular Data Grid Component
import type { ColDef, RowSelectionOptions } from 'ag-grid-community'; // Column Definition Type Interface
import { ClubData, ClubAdmins } from '../Data/club-data';
import { ClubFormComponent } from '../Forms/club-form/club-form.component';
import { AdminSelectDropdownComponent } from '../Components/admin-select-dropdown/admin-select-dropdown.component';
import { DeletePopupComponent } from '../Components/delete-popup/delete-popup.component';
import { EditComponentComponent } from '../Components/edit-component/edit-component.component';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Club, ClubService } from '../services/club/club.service';
import { Router } from '@angular/router';

ModuleRegistry.registerModules([AllCommunityModule]);

@Component({
  selector: 'app-clubs',
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
    <div class="top-container">
      <mat-form-field>
        <mat-label> Find Club</mat-label>
        <mat-select [formControl]="clubName">
          @for (club of clubNames; track clubName) {
          <mat-option [value]="club">{{ club }}</mat-option>
          }
        </mat-select>
      </mat-form-field>
      <div class="button-container">
        <button mat-raised-button (click)="openDialog()">Add Club</button>
        <button
          class="remove"
          mat-raised-button
          (click)="openDeleteconfirmationDialog()"
        >
          Remove Selected User
        </button>
        <button
          class="manage-admins"
          mat-raised-button
          (click)="navigateToManageAdmins()"
        >
          Manage Admins
        </button>
      </div>
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
  navigateToManageAdmins() {
    this.router.navigate(['/dashboard/manageAdmins']);
  }
  constructor(private dialogRef: MatDialog, private router: Router) {}
  @ViewChild('agGrid') agGrid!: AgGridAngular; // Access the grid component

  private gridApi: any; // Store API reference

  clubService: ClubService = inject(ClubService);

  clubNames = ClubData.map((clubNames) => clubNames.club_name);

  clubName = new FormControl<string>('');

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

    // dialogRef.afterClosed().subscribe((data) => {
    //   console.log(data);
    //   this.addNewClub(data.clubName, data.clubAddress, data.clubDescription);
    // });

    dialogRef.afterClosed().subscribe((createdClub) => {
      if (createdClub) {
        // Fetch fresh data from backend
        this.clubService.getAllClubs().subscribe({
          next: (clubs) => {
            this.clubData = clubs;
            this.generateRowData(); // Updates grid
          },
          error: (err) => {
            console.error('Failed to reload clubs:', err);
          },
        });
      }
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
  clubData: Club[] = [];
  clubAdmins = ClubAdmins;
  rowData: any[] = [];
  // Row Data: The data to be displayed.

  generateRowData() {
    this.rowData = this.clubData.map((club) => ({
      Id: club.id,
      Name: club.name,
      Address: club.address,
      Admin:
        (club.clubAdmins as any)?.$values
          ?.map((admin: any) => admin.name)
          .join(', ') || '',
    }));

    if (this.gridApi) {
      this.gridApi.setRowData(this.rowData);
    }
  }

  // Function to add a new admin dynamically
  addAdmin(clubName: string, newAdmin: string, params?: any) {
    // Find the club in the ClubData array
    const club = this.clubData.find((c) => c.name === clubName);
    if (club) {
      club.clubAdmins?.push(newAdmin); // Add new admin to the data structure

      // Update the row immediately
      if (params && this.gridApi) {
        const updatedClub = this.clubData.find((c) => c.name === clubName);
        if (updatedClub) {
          params.node.setDataValue('Admin', updatedClub.clubAdmins?.join(', '));
        }
      }
      this.generateRowData(); // Refresh rowData
    }
  }

  removeAdmin(clubName: string, selectedAdmins: string[], params?: any) {
    const club = this.clubData.find((c) => c.name === clubName);
    if (club) {
      club.clubAdmins = club.clubAdmins?.filter(
        (admin) => !selectedAdmins.includes(admin)
      );

      // Update the row immediately
      if (params && this.gridApi) {
        const updatedClub = this.clubData.find((c) => c.name === clubName);
        if (updatedClub) {
          params.node.setDataValue('Admin', updatedClub.clubAdmins?.join(', '));
        }
      }
      this.generateRowData(); // Refresh rowData
    }
  }

  ngOnInit() {
    // this.generateRowData(); // Load all data initially

    // Listen to changes in the selected club
    this.clubName.valueChanges.subscribe((selectedClub: any) => {
      this.filterDataByClub(selectedClub);
    });

    this.clubService.getAllClubs().subscribe({
      next: (data) => {
        this.clubData = data;
        console.log('Clubs:', data);
        this.generateColDefs();

        // Wait to call generateRowData() until gridApi is available
        if (this.gridApi) {
          this.generateRowData();
        }
      },
      error: (err) => {
        console.error('Failed to load clubs:', err);
      },
    });
  }

  filterDataByClub(selectedClub: string) {
    if (selectedClub) {
      this.rowData = this.clubData
        .filter((club) => club.name === selectedClub)
        .map((club) => ({
          Id: club.id,
          Name: club.name,
          Address: club.address,
          Admin: club.clubAdmins?.join(', '),
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
  colDefs: ColDef[] = [];

  generateColDefs() {
    this.colDefs = [
      { field: 'Name' },
      { field: 'Address' },
      {
        field: 'Admin',
        editable: true,
        cellEditor: 'agSelectCellEditor',
        cellEditorParams: {
          values: this.clubData.map((club) => club.clubAdmins),
        },
      },
      {
        field: '',
        headerName: '',
        cellRenderer: EditComponentComponent,
        width: 100,
        cellRendererParams: (params: any) => {
          const clubId = params.data.Id;
          const club = this.clubData.find((c) => c.id === clubId);
          console.log('Cell renderer params id', club?.id);
          return {
            updateClubData: (event: any) => this.handleUpdatedClub(event),
            section: 'Club',
            clubId: club?.id,
            clubName: club?.name,
            clubAddress: club?.address,
            admins: club?.clubAdmins,
            rowIndex: params.rowIndex,
          };
        },
      },
    ];
  }

  // enableCellSpan = true;

  openDeleteconfirmationDialog() {
    const selectedRows = this.gridApi.getSelectedRows();
    const clubId = selectedRows.map((row: any) => row.Id);
    console.log(
      'Selected Rows:',
      selectedRows.map((row: any) => row.Id)
    );
    const dialogRef = this.dialogRef.open(DeletePopupComponent, {
      width: '500px',
      height: 'auto',
      maxWidth: '90vw',
      panelClass: 'custom-dialog-container',
      data: { clubId },
    });

    dialogRef.afterClosed().subscribe((data) => {
      console.log('Selected Rows club Id:', data.id);

      this.clubService.deleteClub(data.id).subscribe({
        next: (response) => {
          console.log('Club deleted successfully:', response);
          this.clubService.getAllClubs().subscribe({
            next: (clubs) => {
              this.clubData = clubs;
              this.generateRowData(); // Updates grid
              //success toastr
            },
            error: (err) => {
              console.error('Failed to reload clubs:', err);
              //failed toastr
            },
          });
          // Optionally refresh the club list or show a success message
        },
        error: (error) => {
          console.error('Error deleting club:', error);
          // Show error message to the user
        },
      });
    });
  }

  addNewClub(clubName: string, clubAddress: string, clubDescription: string) {
    this.clubData.push({
      id: 0,
      name: clubName,
      address: clubAddress,
      clubAdmins: [''],
      shortName: '',
      description: '',
      countryCode: '',
      activated: false,
    });

    this.rowData = [
      ...this.clubData.map((club) => ({
        Name: club.name,
        Address: club.address,
        Admin: club.clubAdmins,
      })),
    ];
  }

  // Function to update row data
  handleUpdatedClub(event: any) {
    const { clubId } = event;

    // Fetch fresh data
    this.clubService.getAllClubs().subscribe({
      next: (clubs) => {
        this.clubData = clubs;
        this.generateRowData(); // Refresh rowData
      },
      error: (err) => {
        console.error('Failed to reload clubs after update:', err);
      },
    });
  }
}
