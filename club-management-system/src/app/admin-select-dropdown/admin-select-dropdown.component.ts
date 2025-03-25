import { Component } from '@angular/core';
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
      <mat-label>Toppings</mat-label>
      <mat-select [formControl]="toppings" multiple>
        @for (topping of toppingList; track topping) {
        <mat-option [value]="topping">{{ topping }}</mat-option>
        }
      </mat-select>
    </mat-form-field>
    <button mat-button (click)="submit()">OK</button>
  `,
  styleUrl: './admin-select-dropdown.component.css',
})
export class AdminSelectDropdownComponent {
  constructor(private dialogRef: MatDialogRef<AdminSelectDropdownComponent>) {}
  toppings = new FormControl('');
  toppingList: string[] = [
    'Extra cheese',
    'Mushroom',
    'Onion',
    'Pepperoni',
    'Sausage',
    'Tomato',
  ];

  submit() {
    this.dialogRef.close(this.toppings.value);
  }
}
