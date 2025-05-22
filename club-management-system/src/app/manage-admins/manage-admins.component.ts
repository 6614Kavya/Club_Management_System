import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgGridAngular } from 'ag-grid-angular';
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community';
import type { ColDef, RowSelectionOptions } from 'ag-grid-community';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { ClubService, Admin } from '../services/club/club.service'; // Assume Admin interface

ModuleRegistry.registerModules([AllCommunityModule]);

@Component({
  selector: 'app-manage-admins',
  standalone: true,
  imports: [CommonModule, AgGridAngular, MatButtonModule, MatDialogModule],
  template: `
    <div class="button-container">
      <button mat-raised-button color="primary" (click)="openAddAdminDialog()">
        Add Admin
      </button>
      <button
        mat-raised-button
        class="remove"
        (click)="openDeleteConfirmation()"
      >
        Remove Selected Admin
      </button>
    </div>

    <ag-grid-angular
      class="ag-theme-alpine"
      style="width: 100%; height: 500px;"
      [rowData]="rowData"
      [columnDefs]="colDefs"
      [rowSelection]="rowSelection"
      (gridReady)="onGridReady($event)"
    ></ag-grid-angular>
  `,
  styleUrls: ['./manage-admins.component.css'],
})
export class ManageAdminsComponent implements OnInit {
  @ViewChild(AgGridAngular) agGrid!: AgGridAngular;

  private gridApi: any;

  clubService = inject(ClubService);

  rowData: Admin[] = [];

  rowSelection: RowSelectionOptions | 'single' | 'multiple' = 'multiple';

  colDefs: ColDef[] = [
    {
      field: 'clubName',
      headerName: 'Club Name',
      sortable: true,
      filter: true,
    },
    {
      field: 'adminName',
      headerName: 'Admin Name',
      sortable: true,
      filter: true,
    },
    { field: 'email', headerName: 'Email', sortable: true, filter: true },
  ];

  ngOnInit() {
    this.loadAdmins();
  }

  loadAdmins() {
    this.clubService.getAllClubData().subscribe({
      next: (clubs) => {
        const admins: Admin[] = [];

        for (const club of clubs) {
          const clubName = club.name;
          const adminList = club.clubAdmins?.$values || [];

          for (const admin of adminList) {
            admins.push({
              clubName: clubName,
              adminName: admin.name,
              email: admin.email,
            });
          }
        }

        this.rowData = admins;

        if (this.gridApi) {
          this.gridApi.setRowData(this.rowData);
        }
      },
      error: (err) => console.error('Failed to load admins:', err),
    });
  }

  onGridReady(params: any) {
    this.gridApi = params.api;
  }

  openAddAdminDialog() {
    // Open a dialog to add admin (implement separately)
  }

  openDeleteConfirmation() {
    const selectedRows = this.gridApi.getSelectedRows();
    if (selectedRows.length === 0) {
      alert('No admins selected');
      return;
    }
    // Confirm and remove selected admins (implement dialog + delete logic)
  }
}
