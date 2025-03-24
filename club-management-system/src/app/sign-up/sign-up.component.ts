import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { UserService } from '../user.service';
import { User } from '../user';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatButtonModule,
    MatInputModule,
    MatSelectModule,
    MatFormFieldModule,
    CommonModule,
  ],
  template: `<section>
    <form [formGroup]="applyForm" class="apply">
      <label for="email">Email</label>
      <input id="email" type="email" formControlName="email" />
      <div class="text-danger" *ngIf="isFormSubmitted">
        <span *ngIf="applyForm.controls['email'].errors?.['required']"
          >Email is required</span
        >
        <span *ngIf="applyForm.controls['email'].errors?.['email']"
          >Not a valid email address</span
        >
      </div>

      <label for="enter-password">Enter Password</label>
      <input id="epassword" type="Password" formControlName="epassword" />
      <div class="text-danger" *ngIf="isFormSubmitted">
        <span *ngIf="applyForm.controls['epassword'].errors?.['required']"
          >Password is required</span
        >
        <span *ngIf="applyForm.controls['epassword'].errors?.['minlength']"
          >Password must contain at least 6 characters</span
        >
      </div>

      <label for="user-type">User Type</label>
      <select class="form-select" formControlName="userType">
        <option value="Super Admin">Super Admin</option>
        <option value="Club Admin">Club Admin</option>
        <option value="Field Admin">Field Admin</option>
        <option value="Team Manager">Team Manager</option>
        <option value="General User">General User</option>
      </select>
      <div class="text-danger" *ngIf="isFormSubmitted">
        <span *ngIf="applyForm.controls['userType'].errors?.['required']"
          >Please select your role</span
        >
      </div>

      <button mat-raised-button (click)="createUser()">Submit</button>
    </form>
  </section>`,
  styleUrl: './sign-up.component.css',
})
export class SignUpComponent {
  isFormSubmitted: boolean = false;

  applyForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    epassword: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),

    userType: new FormControl('', Validators.required),
  });

  selected = 'User Type';

  constructor(private userService: UserService, private router: Router) {}

  createUser() {
    this.isFormSubmitted = true;
    this.applyForm.valid &&
      this.router.navigate(['/dashboard'], {
        queryParams: { email: this.applyForm.value.email },
      });
  }
}
