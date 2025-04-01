import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';
import {
  MatDialog,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { EditClubComponent } from '../edit-club/edit-club.component';
import { EditFieldComponent } from '../edit-field/edit-field.component';
import { EditTeamComponent } from '../edit-team/edit-team.component';

@Component({
  selector: 'app-edit-component',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule, MatIconModule],
  template: `
    <button mat-icon-button color="primary" (click)="onEditClick()">
      <mat-icon>edit</mat-icon>
    </button>
  `,
  styleUrl: './edit-component.component.css',
})
export class EditComponentComponent implements ICellRendererAngularComp {
  @Output() updateClubData = new EventEmitter<any>(); // Emit updated club data
  @Output() updateFieldData = new EventEmitter<any>();
  @Output() updateTeamData = new EventEmitter<any>();
  value: any;
  constructor(private dialogRef: MatDialog) {}

  private params!: ICellRendererParams;

  agInit(params: ICellRendererParams): void {
    this.params = params;
  }

  onEditClick(): void {
    console.log('Edit clicked for:', this.params.data);
    if ((this.params as any).section === 'Club') {
      this.openEditClubComponent(this.params);
    } else if ((this.params as any).section === 'Field') {
      this.openEditFieldComponent(this.params);
    } else if ((this.params as any).section === 'Team') {
      this.openEditTeamComponent(this.params);
    }
  }

  refresh(params: ICellRendererParams): boolean {
    return true;
  }

  // updateValue(params: ICellRendererParams) {
  //   const newValue = 'Updated Value'; // Your new value
  //   if (this.params.setValue) {
  //     this.params.setValue(newValue); // Safely update the cell value
  //   } else {
  //     console.warn('setValue is not available on params', this.params);
  //   }
  // }

  openEditClubComponent(params: ICellRendererParams) {
    const admins = Array.isArray(params.data.Admin)
      ? params.data.Admin
      : params.data.Admin?.split(',').map((admin: string) => admin.trim()) ||
        [];
    const dialogRef = this.dialogRef.open(EditClubComponent, {
      width: '500px',
      height: 'auto',
      maxWidth: '90vw',
      panelClass: 'custom-dialog-container',
      data: {
        clubName: params.data.Name,
        clubAddress: params.data.Address,
        admins: admins, // ensure that the data is passed as an array
      },
    });

    dialogRef.afterClosed().subscribe((updatedData) => {
      if (updatedData) {
        console.log('Updated Data:', updatedData);
        this.updateClubData.emit({
          rowIndex: this.params.node.rowIndex,
          ...updatedData,
        });

        // ✅ Update the grid row
        this.params.node.setData({
          ...this.params.data,
          Name: updatedData.clubName,
          Address: updatedData.clubAddress,
          Admin: updatedData.admins.join(', '),
        });
      }
    });
  }

  openEditFieldComponent(params: ICellRendererParams) {
    const admins = Array.isArray(params.data.Admin)
      ? params.data.Admin
      : params.data.Admin?.split(',').map((admin: string) => admin.trim()) ||
        [];
    const dialogRef = this.dialogRef.open(EditFieldComponent, {
      width: '500px',
      height: 'auto',
      maxWidth: '90vw',
      panelClass: 'custom-dialog-container',
      data: {
        fieldName: params.data.Name,
        fieldAddress: params.data.Address,
        clubName: params.data.Club,
        admins: admins, // ensure that the data is passed as an array
      },
    });

    dialogRef.afterClosed().subscribe((updatedData) => {
      if (updatedData) {
        console.log('Updated Data:', updatedData);
        this.updateClubData.emit({
          rowIndex: this.params.node.rowIndex,
          ...updatedData,
        });

        // ✅ Update the grid row
        this.params.node.setData({
          ...this.params.data,
          Name: updatedData.fieldName,
          Address: updatedData.fieldAddress,
          Club: updatedData.clubName,
          Admin: updatedData.admins.join(', '),
        });
      }
    });
  }

  openEditTeamComponent(params: ICellRendererParams) {
    const admins = Array.isArray(params.data.Admin)
      ? params.data.Admin
      : params.data.Admin?.split(',').map((admin: string) => admin.trim()) ||
        [];
    const dialogRef = this.dialogRef.open(EditTeamComponent, {
      width: '500px',
      height: 'auto',
      maxWidth: '90vw',
      panelClass: 'custom-dialog-container',
      data: {
        teamName: params.data.Name,
        teamAddress: params.data.Address,
        clubName: params.data.Club,
        admins: admins, // ensure that the data is passed as an array
      },
    });

    dialogRef.afterClosed().subscribe((updatedData) => {
      if (updatedData) {
        console.log('Updated Data:', updatedData);
        this.updateTeamData.emit({
          rowIndex: this.params.node.rowIndex,
          ...updatedData,
        });

        // ✅ Update the grid row
        this.params.node.setData({
          ...this.params.data,
          Name: updatedData.teamName,
          Address: updatedData.teamAddress,
          Club: updatedData.clubName,
          Admin: updatedData.admins.join(', '),
        });
      }
    });
  }
}
