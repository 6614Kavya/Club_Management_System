import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
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
import { UserFormComponent } from '../user-form/user-form.component';

ModuleRegistry.registerModules([AllCommunityModule]);

@Component({
  selector: 'app-users',
  imports: [AgGridAngular, CommonModule, MatButtonModule, MatDialogModule],
  template: `
    <div class="button-container">
      <button mat-raised-button (click)="openDialog()">Add User</button>
      <button mat-raised-button (click)="getSelectedRow()">
        Get Selected User
      </button>
    </div>

    <!-- The AG Grid component -->
    <ag-grid-angular
      class="ag-theme-alpine"
      [rowData]="rowData"
      [columnDefs]="colDefs"
      [rowSelection]="rowSelection"
    />
  `,
  styleUrl: './users.component.css',
})
export class UsersComponent {
  constructor(private dialogRef: MatDialog, private cdr: ChangeDetectorRef) {}
  @ViewChild('agGrid') agGrid!: AgGridAngular; // Access the grid component

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
        data.assignedClub
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
  getSelectedRow() {
    const selectedRows = this.agGrid.api.getSelectedRows();
    console.log('Selected Rows:', selectedRows);
  }
}
