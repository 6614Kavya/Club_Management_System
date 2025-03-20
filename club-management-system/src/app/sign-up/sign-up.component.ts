import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { UserService } from '../user.service';
import { User } from '../user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatButtonModule,
    MatInputModule,
    MatSelectModule,
    MatFormFieldModule,
  ],
  template: `<section>
    <form [formGroup]="applyForm" class="apply">
      <label for="email">Email</label>
      <input id="email" type="email" formControlName="email" />

      <label for="enter-password">Enter Password</label>
      <input id="epassword" type="Password" formControlName="epassword" />

      <mat-form-field>
        <mat-label>User Type</mat-label>
        <mat-select formControlName="userType" [(value)]="selected">
          <mat-option value="Super Admin">Super Admin</mat-option>
          <mat-option value="Club Admin">Club Admin</mat-option>
          <mat-option value="Field Admin">Field Admin</mat-option>
          <mat-option value="Team Manager">Team Manager</mat-option>
          <mat-option value="General User">General User</mat-option>
        </mat-select>
      </mat-form-field>

      <button mat-raised-button (click)="createUser()">Submit</button>
    </form>
  </section>`,
  styleUrl: './sign-up.component.css',
})
export class SignUpComponent {
  applyForm = new FormGroup({
    email: new FormControl(''),
    epassword: new FormControl(''),
    cpassword: new FormControl(''),
  });

  selected = 'User Type';

  constructor(private userService: UserService, private router: Router) {}

  createUser() {
    this.router.navigate(['/dashboard'], {
      queryParams: { email: this.applyForm.value.email },
    });
  }
}
