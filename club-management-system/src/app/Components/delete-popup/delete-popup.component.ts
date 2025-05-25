import { Component } from '@angular/core';
import {
  MatDialog,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { Inject, Optional } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface DeletePopupData {
  clubId?: any;
  fieldId?: any;
  teamId?: any;
  userId?: any;
}

@Component({
  selector: 'app-delete-popup',
  imports: [MatDialogModule, MatButtonModule],
  template: `
    <mat-dialog-content>
      <h2>Are you sure you want to delete?</h2>
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button mat-dialog-close>Cancel</button>
      <button
        mat-button
        [mat-dialog-close]="true"
        cdkFocusInitial
        (click)="submit()"
      >
        Delete
      </button>
    </mat-dialog-actions>
  `,
  styleUrl: './delete-popup.component.css',
})
export class DeletePopupComponent {
  constructor(
    private dialogRef: MatDialogRef<DeletePopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DeletePopupData
  ) {}

  isConfirmed: boolean = false;

  submit() {
    if (this.data.clubId) {
      console.log('Deleting club with ID:', this.data.clubId);
      this.dialogRef.close({ type: 'club', id: this.data.clubId });
    } else if (this.data.fieldId) {
      console.log('Deleting field with ID:', this.data.fieldId);
      this.dialogRef.close({ type: 'field', id: this.data.fieldId });
    } else if (this.data.teamId) {
      console.log('Deleting team with ID:', this.data.teamId);
      this.dialogRef.close({ type: 'team', id: this.data.teamId });
    } else if (this.data.userId) {
      console.log('Deleting user with ID:', this.data.userId);
      this.dialogRef.close({ type: 'user', id: this.data.userId });
    } else {
      this.dialogRef.close(null);
    }
  }
}
