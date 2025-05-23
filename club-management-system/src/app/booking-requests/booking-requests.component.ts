// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-booking-requests',
//   imports: [],
//   template: `
//     <p>
//       booking-requests works!
//     </p>
//   `,
//   styleUrl: './booking-requests.component.css'
// })
// export class BookingRequestsComponent {

// }

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
import { Clubs } from '../Data/club-main-data';
import { ConfirmBookingComponent } from './../confirm-booking/confirm-booking.component';
import { BookingService } from '../services/bookings/booking.service';
import { SelectedBookings } from '../services/bookings/booking.service';

ModuleRegistry.registerModules([AllCommunityModule]);

@Component({
  selector: 'app-booking-requests',
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
    <!-- <mat-form-field>
      <mat-label> Find Club</mat-label>
      <mat-select [formControl]="clubName">
        @for (club of clubNames; track clubName) {
        <mat-option [value]="club">{{ club }}</mat-option>
        }
      </mat-select>
    </mat-form-field> -->
    <!-- <div class="button-container">
      <button mat-raised-button (click)="openDialog()">Add Club</button>
      <button
        class="remove"
        mat-raised-button
        (click)="openDeleteconfirmationDialog()"
      >
        Remove Selected User
      </button>
    </div> -->

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
  styleUrl: './booking-requests.component.css',
})
export class BookingRequestsComponent {
  constructor(private dialogRef: MatDialog) {}

  @ViewChild('agGrid') agGrid!: AgGridAngular; // Access the grid component

  bookingService: BookingService = inject(BookingService);

  private gridApi: any; // Store API reference

  // clubNames = ClubData.map((clubNames) => clubNames.club_name);

  // clubName = new FormControl<string>('');

  rowSelection: RowSelectionOptions | 'single' | 'multiple' = {
    mode: 'multiRow',
  };

  isDeletionConfirmed: boolean = false;

  // onGridReady(params: any) {
  //   this.gridApi = params.api; // Store API when grid is ready
  // }
  onGridReady(params: any) {
    this.gridApi = params.api;

    // Once grid API is ready, set data if already loaded
    if (this.pendingBookings.length > 0) {
      this.generateRowData();
    }
  }

  // openDialog() {
  //   const dialogRef = this.dialogRef.open(ClubFormComponent, {
  //     width: '500px',
  //     height: 'auto',
  //     maxWidth: '90vw',
  //     panelClass: 'custom-dialog-container',
  //   });

  //   dialogRef.afterClosed().subscribe((data) => {
  //     console.log(data);
  //     this.addNewClub(data.clubName, data.clubAddress, data.clubDescription);
  //   });
  // }

  // openAdminDropdown(clubName: string, params?: any, action?: 'add' | 'remove') {
  //   const dialogRef = this.dialogRef.open(AdminSelectDropdownComponent, {
  //     width: '500px',
  //     height: 'auto',
  //     maxWidth: '90vw',
  //     panelClass: 'custom-dialog-container',
  //     data: { clubName: clubName, admins: this.clubAdmins }, //passes data to AdminSelectDropdownComponent
  //   });

  //   //returns the data that was passed when dialogRef.close(data) is called inside the dialog component.
  //   dialogRef.afterClosed().subscribe((data) => {
  //     if (action === 'add') {
  //       data.forEach((admin: any) => this.addAdmin(clubName, admin, params));
  //     } else if (action === 'remove') {
  //       this.removeAdmin(clubName, data, params);
  //     }
  //     this.generateRowData(); // Refresh rowData
  //     // console.log(data);
  //     // this.addAdmin(clubName, data);
  //   });
  // }
  // clubData = Clubs;
  // clubAdmins = this.clubData.map((club) => club.club_admins);
  rowData: any[] = [];
  pendingBookings: SelectedBookings[] = [];
  // Row Data: The data to be displayed.

  generateRowData() {
    // this.rowData = this.clubData.map((club) => ({
    //   Field: club.name,
    //   Date: club.address,
    //   Time: club.club_admins.join(','),
    // }));

    this.rowData = this.pendingBookings.map((booking) => ({
      // Field: club.name,
      // Date: club.address,
      // Time: club.club_admins.join(','),
      id: booking.id,
      Field: booking?.fieldPart?.field?.name,
      StartTime: booking?.startTime,
      EndTime: booking?.endTime,
    }));

    if (this.gridApi) {
      this.gridApi.setRowData(this.rowData);
    }

    console.log('Row data', this.rowData);
    console.log('This pending bookings', this.pendingBookings);
  }

  // Function to add a new admin dynamically
  // addAdmin(clubName: string, newAdmin: string, params?: any) {
  //   // Find the club in the ClubData array
  //   const club = this.clubData.find((c) => c.name === clubName);
  //   if (club) {
  //     club.club_admins.push(newAdmin); // Add new admin to the data structure

  //     // Update the row immediately
  //     if (params && this.gridApi) {
  //       const updatedClub = this.clubData.find((c) => c.name === clubName);
  //       if (updatedClub) {
  //         params.node.setDataValue('Admin', updatedClub.club_admins.join(', '));
  //       }
  //     }
  //     this.generateRowData(); // Refresh rowData
  //   }
  // }

  // removeAdmin(clubName: string, selectedAdmins: string[], params?: any) {
  //   const club = this.clubData.find((c) => c.name === clubName);
  //   if (club) {
  //     club.club_admins = club.club_admins.filter(
  //       (admin) => !selectedAdmins.includes(admin)
  //     );

  //     // Update the row immediately
  //     if (params && this.gridApi) {
  //       const updatedClub = this.clubData.find((c) => c.name === clubName);
  //       if (updatedClub) {
  //         params.node.setDataValue('Admin', updatedClub.club_admins.join(', '));
  //       }
  //     }
  //     this.generateRowData(); // Refresh rowData
  //   }
  // }

  // ngOnInit() {
  //   this.bookingService.getBookingsByStatus('Pending').subscribe({
  //     next: (bookings) => {
  //       console.log('Pending bookings:', bookings);
  //       this.pendingBookings = bookings;
  //       this.generateRowData(); // Load all data initially
  //     },
  //     error: (err) => {
  //       console.error('Error fetching bookings:', err);
  //     },
  //   });

  //   // Listen to changes in the selected club
  //   // this.clubName.valueChanges.subscribe((selectedClub: any) => {
  //   //   this.filterDataByClub(selectedClub);
  //   // });
  // }

  ngOnInit() {
    this.bookingService.getBookingsByStatus('Pending').subscribe({
      next: (bookings) => {
        this.pendingBookings = bookings;

        // Wait to call generateRowData() until gridApi is available
        if (this.gridApi) {
          this.generateRowData();
        }
      },
      error: (err) => {
        console.error('Error fetching bookings:', err);
      },
    });
  }

  // filterDataByClub(selectedClub: string) {
  //   if (selectedClub) {
  //     this.rowData = this.clubData
  //       .filter((club) => club.name === selectedClub)
  //       .map((club) => ({
  //         Name: club.name,
  //         Address: club.address,
  //         Admin: club.club_admins.join(', '),
  //       }));
  //   } else {
  //     this.generateRowData(); // Reset to all data if no club is selected
  //   }

  //   // Update the AG Grid with the new filtered data
  //   if (this.gridApi) {
  //     this.gridApi.setRowData(this.rowData);
  //   }
  // }

  // Column Definitions: Defines the columns to be displayed.
  colDefs: ColDef[] = [
    { field: 'Field' },
    { field: 'StartTime' },
    {
      field: 'EndTime',
      // editable: true,
      cellEditor: 'agSelectCellEditor',
      // cellEditorParams: {
      //   values: this.clubData.map((club) => club.club_admins),
      // },
    },
    {
      field: '',
      headerName: '',
      cellRenderer: ConfirmBookingComponent,
      width: 120,
      cellRendererParams: {
        confirmSelectedBooking: this.confirmSelectedBooking.bind(this),
      },
    },
  ];
  // enableCellSpan = true;

  // openDeleteconfirmationDialog() {
  //   const dialogRef = this.dialogRef.open(DeletePopupComponent, {
  //     width: '500px',
  //     height: 'auto',
  //     maxWidth: '90vw',
  //     panelClass: 'custom-dialog-container',
  //   });

  //   dialogRef.afterClosed().subscribe((data) => {
  //     if (data === true) {
  //       this.isDeletionConfirmed = true;
  //       if (this.gridApi) {
  //         const selectedRows = this.gridApi.getSelectedRows();
  //         // Filter out selected rows from rowData
  //         this.rowData = this.rowData.filter(
  //           (row) => !selectedRows.includes(row)
  //         );
  //         // Refresh the grid with the updated data
  //         this.gridApi.setRowData(this.rowData);
  //         console.log('Selected Rows:', selectedRows);
  //       } else {
  //         console.error('Grid API is not initialized.');
  //       }
  //     }
  //   });
  // }

  // addNewClub(clubName: string, clubAddress: string, clubDescription: string) {
  //   this.clubData.push({
  //     id: 0,
  //     name: clubName,
  //     address: clubAddress,
  //     club_admins: [''],
  //     shortName: '',
  //     description: '',
  //     countryCode: '',
  //     activated: false,
  //     club_logo: '',
  //     userClubs: [],
  //     fieldList: [],
  //     teamList: [],
  //   });

  //   this.rowData = [
  //     ...this.clubData.map((club) => ({
  //       Name: club.name,
  //       Address: club.address,
  //       Admin: club.club_admins,
  //     })),
  //   ];
  // }

  // Function to update row data
  // handleUpdatedClub(event: any) {
  //   const { rowIndex, clubName, clubAddress, admins } = event;

  //   if (this.gridApi) {
  //     const rowNode = this.gridApi.getDisplayedRowAtIndex(rowIndex);
  //     if (rowNode) {
  //       rowNode.setDataValue('Name', clubName);
  //       rowNode.setDataValue('Address', clubAddress);
  //       rowNode.setDataValue('Admin', admins.join(', '));
  //     }
  //   }

  //   // Update the clubData array
  //   const club = this.clubData.find((c) => c.name === clubName);
  //   if (club) {
  //     club.address = clubAddress;
  //     club.club_admins = admins;
  //   }
  // }

  confirmSelectedBooking(bookingId: any) {
    // const { bookingId } = event;
    // console.log('Selected pending booking', bookingId);

    // this.bookingService.getBookingsByStatus('Pending').subscribe({
    //   next: (bookings) => {
    //     this.pendingBookings = bookings;

    //     // Wait to call generateRowData() until gridApi is available
    //     if (this.gridApi) {
    //       this.generateRowData();
    //     }
    //   },
    //   error: (err) => {
    //     console.error('Error fetching bookings:', err);
    //   },
    // });
    console.log('Booking confirmed:', bookingId);
    // Remove the booking from the list
    this.pendingBookings = this.pendingBookings.filter(
      (b) => b.id !== bookingId
    );
    this.generateRowData();
  }
}
