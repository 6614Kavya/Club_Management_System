import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgGridAngular } from 'ag-grid-angular';
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community';
import type { ColDef, RowSelectionOptions } from 'ag-grid-community';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { ClubService, Admin } from '../services/club/club.service'; // Assume Admin interface
import { MatDialog } from '@angular/material/dialog';
import { AdminSelectDropdownComponent } from '../Components/admin-select-dropdown/admin-select-dropdown.component';

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
  constructor(private dialogRef: MatDialog) {}
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
    const dialogRef = this.dialogRef.open(AdminSelectDropdownComponent, {
      width: '500px',
      height: 'auto',
      maxWidth: '90vw',
      panelClass: 'custom-dialog-container',
      // data: { clubName: clubName, admins: this.clubAdmins }, //passes data to AdminSelectDropdownComponent
    });

    //returns the data that was passed when dialogRef.close(data) is called inside the dialog component.
    dialogRef.afterClosed().subscribe((data) => {
      console.log('Selected Admin', data);
      console.log('Selected club club id', data.club.id);
      // this.addAdmin(clubName, data);

      const payload = {
        userId: data.user.userId,
        clubId: data.club.id,
        role: 'ClubAdmin',
      };

      this.clubService.assignClubAdmin(payload).subscribe({
        next: () => {
          console.log('Club admin assigned successfully');
          this.loadAdmins(); // refresh table
        },
        error: (err) => {
          console.error('Failed to assign club admin:', err);
          alert('Error assigning club admin');
        },
      });
    });
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
