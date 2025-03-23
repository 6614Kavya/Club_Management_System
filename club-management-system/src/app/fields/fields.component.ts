import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AllCommunityModule, ColDef, ModuleRegistry } from 'ag-grid-community';
import { AgGridAngular } from 'ag-grid-angular'; // Angular Data Grid Component
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDialog } from '@angular/material/dialog';
import { FieldData } from '../Data/field-data';
import { FieldFormComponent } from '../field-form/field-form.component';

ModuleRegistry.registerModules([AllCommunityModule]);

@Component({
  selector: 'app-fields',
  imports: [AgGridAngular, CommonModule, MatButtonModule, MatDialogModule],
  template: `
    <div class="button-container">
      <button mat-raised-button (click)="openDialog()">Add Field</button>
    </div>

    <!-- The AG Grid component -->
    <ag-grid-angular
      class="ag-theme-alpine"
      [rowData]="rowData"
      [columnDefs]="colDefs"
    />
  `,
  styleUrl: './fields.component.css',
})
export class FieldsComponent {
  constructor(private dialogRef: MatDialog) {}

  openDialog() {
    this.dialogRef.open(FieldFormComponent, {
      width: '500px',
      height: 'auto',
      maxWidth: '90vw',
      panelClass: 'custom-dialog-container',
    });
  }
  fieldData = FieldData;

  rowData: any[] = [];
  // Row Data: The data to be displayed.
  ngOnInit() {
    this.rowData = this.fieldData.map((field) => ({
      Name: field.field_name,
      Address: field.field_address,
      Club: field.club_name,
      Admin: field.field_admin,
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
        values: this.fieldData.map((field) => field.field_admin),
      },
    },
  ];
}
