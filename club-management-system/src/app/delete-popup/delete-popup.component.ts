import { Component } from '@angular/core';
import {
  MatDialog,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

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
  constructor(private dialogRef: MatDialogRef<DeletePopupComponent>) {}

  isConfirmed: boolean = false;

  submit() {
    this.dialogRef.close(!this.isConfirmed);
  }
}
