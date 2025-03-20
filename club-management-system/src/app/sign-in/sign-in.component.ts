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
  selector: 'app-sign-in',
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
      <label for="first-name">First Name</label>
      <input id="first-name" type="text" formControlName="firstName" />

      <label for="last-name">Last Name</label>
      <input id="last-name" type="text" formControlName="lastName" />

      <label for="email">Email</label>
      <input id="email" type="email" formControlName="email" />

      <label for="enter-password">Enter Password</label>
      <input id="epassword" type="Password" formControlName="epassword" />

      <label for="confirm-password">Confirm Password</label>
      <input id="cpassword" type="Password" formControlName="cpassword" />

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
  styleUrl: './sign-in.component.css',
})
export class SignInComponent {
  applyForm = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    email: new FormControl(''),
    epassword: new FormControl(''),
    cpassword: new FormControl(''),
    userType: new FormControl(''),
  });

  selected = 'User Type';

  constructor(private userService: UserService, private router: Router) {}

  createUser() {
    const user: User = {
      firstName: this.applyForm.value.firstName || '',
      lastName: this.applyForm.value.lastName || '',
      email: this.applyForm.value.email || '',
      password: this.applyForm.value.cpassword || '',
    };

    this.userService.createUser(user);
    this.router.navigate(['/signUp']);
  }
}
