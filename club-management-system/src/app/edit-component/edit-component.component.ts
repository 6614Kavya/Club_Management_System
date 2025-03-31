import { Component, OnInit } from '@angular/core';
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
  constructor(private dialogRef: MatDialog) {}

  private params!: ICellRendererParams;

  agInit(params: ICellRendererParams): void {
    this.params = params;
  }

  onEditClick(): void {
    console.log('Edit clicked for:', this.params.data);
    this.openEditClubComponent(this.params);
  }

  refresh(params: ICellRendererParams): boolean {
    return false;
  }

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

    dialogRef.afterClosed().subscribe((data) => console.log(data));
  }
}
