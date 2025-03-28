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
import { FieldData, FieldAdmins } from '../Data/field-data';
import { FieldFormComponent } from '../field-form/field-form.component';
import { AdminSelectDropdownComponent } from '../admin-select-dropdown/admin-select-dropdown.component';
import { DeletePopupComponent } from '../delete-popup/delete-popup.component';

ModuleRegistry.registerModules([AllCommunityModule]);

@Component({
  selector: 'app-fields',
  imports: [AgGridAngular, CommonModule, MatButtonModule, MatDialogModule],
  template: `
    <div class="button-container">
      <button mat-raised-button (click)="openDialog()">Add Field</button>
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
  styleUrl: './fields.component.css',
})
export class FieldsComponent {
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
    this.dialogRef.open(FieldFormComponent, {
      width: '500px',
      height: 'auto',
      maxWidth: '90vw',
      panelClass: 'custom-dialog-container',
    });
  }

  openAdminDropdown(fieldName: string) {
    const dialogRef = this.dialogRef.open(AdminSelectDropdownComponent, {
      width: '500px',
      height: 'auto',
      maxWidth: '90vw',
      panelClass: 'custom-dialog-container',
      data: { clubName: fieldName, admins: this.fieldAdmins }, //passes data to AdminSelectDropdownComponent
    });

    //returns the data that was passed when dialogRef.close(data) is called inside the dialog component.
    dialogRef.afterClosed().subscribe((data) => {
      console.log(data);
      this.addAdmin(fieldName, data);
    });
  }
  fieldData = FieldData;
  fieldAdmins = FieldAdmins;

  rowData: any[] = [];
  // Row Data: The data to be displayed.

  generateRowData() {
    this.rowData = this.fieldData.flatMap((field) => {
      const firstRow = {
        Name: field.field_name,
        Address: field.field_address,
        Club: field.club_name,
        Admin: field.field_admin[0] || '', // First admin
      };
      const adminRows = field.field_admin.slice(1).map((admin) => ({
        Name: '',
        Address: '',
        Club: '',
        Admin: admin,
      }));
      return [firstRow, ...adminRows];
    });
  }

  // Function to add a new admin dynamically
  addAdmin(fieldName: string, newAdmin: string) {
    // Find the club in the ClubData array
    const field = this.fieldData.find((f) => f.field_name === fieldName);
    if (field) {
      field.field_admin.push(newAdmin); // Add new admin to the data structure
      this.generateRowData(); // Refresh rowData
    }
  }

  ngOnInit() {
    this.generateRowData();
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
        values: this.fieldData.map((field) => field.field_admin),
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
