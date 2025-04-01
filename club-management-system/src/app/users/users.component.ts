import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ViewChild,
} from '@angular/core';
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
import { UserData } from '../Data/user-data';
import { UserFormComponent } from '../Forms/user-form/user-form.component';
import { DeletePopupComponent } from '../Components/delete-popup/delete-popup.component';

ModuleRegistry.registerModules([AllCommunityModule]);

@Component({
  selector: 'app-users',
  imports: [AgGridAngular, CommonModule, MatButtonModule, MatDialogModule],
  template: `
    <div class="button-container">
      <button mat-raised-button (click)="openDialog()">Add User</button>
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
  styleUrl: './users.component.css',
})
export class UsersComponent implements AfterViewInit {
  constructor(private dialogRef: MatDialog, private cdr: ChangeDetectorRef) {}
  @ViewChild('agGrid') agGrid!: AgGridAngular; // Access the grid component

  private gridApi: any; // Store API reference

  isDeletionConfirmed: boolean = false;

  ngAfterViewInit() {
    if (!this.agGrid) {
      console.error('AgGridAngular component is not initialized.');
    }
  }

  onGridReady(params: any) {
    this.gridApi = params.api; // Store API when grid is ready
  }

  openDialog() {
    const dialogRef = this.dialogRef.open(UserFormComponent, {
      width: '500px',
      height: 'auto',
      maxWidth: '90vw',
      panelClass: 'custom-dialog-container',
    });

    //returns the data that was passed when dialogRef.close(data) is called inside the dialog component.
    dialogRef.afterClosed().subscribe((data) => {
      console.log(data);
      this.addNewUser(
        data.userName,
        data.userAddress,
        data.role,
        data.assignedClub || data.assignedField || data.assignedTeam
      );
    });
  }
  userData = UserData;

  rowSelection: RowSelectionOptions | 'single' | 'multiple' = {
    mode: 'multiRow',
  };

  rowData: any[] = [];
  // Row Data: The data to be displayed.
  ngOnInit() {
    this.rowData = this.userData.flatMap((user) =>
      user.roles.map((role) => ({
        Name: user.user_name,
        Address: user.user_address,
        Club: role.club, // Ensure this exists in the role object
        Admin: role.role, // Role associated with the club
      }))
    );
  }

  // Column Definitions: Defines the columns to be displayed.
  colDefs: ColDef[] = [
    { field: 'Name' },
    { field: 'Address' },

    {
      field: 'Admin',
      headerName: 'Role',
      editable: true,
      cellEditor: 'agSelectCellEditor',
      cellEditorParams: {
        values: this.userData.map((user) =>
          user.roles.map((roles) => roles.role)
        ),
      },
    },
    { field: 'Club', headerName: 'Club/Field/Team' },
  ];

  addNewUser(
    userName: string,
    userAddress: string,
    userRole: string,
    assigned: string
  ) {
    this.userData.push({
      user_name: userName,
      user_address: userAddress,
      roles: [{ role: userRole, club: assigned }],
    });

    this.rowData = [
      ...this.userData.flatMap((user) =>
        user.roles.map((role) => ({
          Name: user.user_name,
          Address: user.user_address,
          Club: role.club,
          Admin: role.role,
        }))
      ),
    ];
  }

  // Method to get selected row data
  // getSelectedRow() {
  //   if (this.isDeletionConfirmed === true) {
  //     if (this.gridApi) {
  //       const selectedRows = this.gridApi.getSelectedRows();
  //       // Filter out selected rows from rowData
  //       this.rowData = this.rowData.filter(
  //         (row) => !selectedRows.includes(row)
  //       );
  //       // Refresh the grid with the updated data
  //       this.gridApi.setRowData(this.rowData);
  //       console.log('Selected Rows:', selectedRows);
  //     } else {
  //       console.error('Grid API is not initialized.');
  //     }
  //   }
  // }

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
}
