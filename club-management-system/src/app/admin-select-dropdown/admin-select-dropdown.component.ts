import { Component, Inject } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-admin-select-dropdown',
  imports: [
    MatFormFieldModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  template: `
    <mat-form-field>
      <mat-label>Admins for {{ data.clubName }}</mat-label>
      <mat-select [formControl]="admins" multiple>
        @for (admin of availableAdmins; track admins) {
        <mat-option [value]="admin">{{ admin }}</mat-option>
        }
      </mat-select>
    </mat-form-field>
    <button mat-button (click)="submit()">OK</button>
  `,
  styleUrl: './admin-select-dropdown.component.css',
})
export class AdminSelectDropdownComponent {
  constructor(
    private dialogRef: MatDialogRef<AdminSelectDropdownComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { clubName: string; admins: string[] }
  ) {
    this.availableAdmins = data.admins;
  }
  admins = new FormControl('');
  availableAdmins: string[] = [];

  submit() {
    this.dialogRef.close(this.admins.value); // returns selected admins
  }
}
