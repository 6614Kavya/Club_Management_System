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
import { UserService } from '../../user.service';
import { User } from '../../user';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@Component({
  selector: 'app-sign-in',
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
      <label for="first-name">First Name</label>
      <input id="first-name" type="text" formControlName="firstName" />
      <div class="text-danger" *ngIf="isFormSubmitted">
        <span *ngIf="applyForm.controls['firstName'].errors?.['required']"
          >First Name is required</span
        >
      </div>

      <label for="last-name">Last Name</label>
      <input id="last-name" type="text" formControlName="lastName" />
      <div class="text-danger" *ngIf="isFormSubmitted">
        <span *ngIf="applyForm.controls['lastName'].errors?.['required']"
          >Last Name is required</span
        >
      </div>

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

      <label for="confirm-password">Confirm Password</label>
      <input id="cpassword" type="Password" formControlName="cpassword" />

      <button mat-raised-button (click)="createUser()">Submit</button>
    </form>
  </section>`,
  styleUrl: './sign-in.component.css',
})
export class SignInComponent {
  isFormSubmitted: boolean = false;

  applyForm = new FormGroup({
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    epassword: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
    cpassword: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
    userType: new FormControl(''),
  });

  selected = 'User Type';

  weatherForecasts: any[] = [];

  constructor(
    private userService: UserService,
    private router: Router,
    private toastr: ToastrService
  ) {
    userService.get().subscribe((weatherForecasts) => {
      this.weatherForecasts = weatherForecasts;
    });
  }

  createUser() {
    console.log('weatherforecasts', this.weatherForecasts);
    const isFormValid = this.applyForm.valid;
    this.isFormSubmitted = true;
    const user: User = {
      firstName: this.applyForm.value.firstName || '',
      lastName: this.applyForm.value.lastName || '',
      email: this.applyForm.value.email || '',
      password: this.applyForm.value.cpassword || '',
    };

    this.userService.createUser(user).subscribe({
      next: (response) => {
        if (response && response.succeeded) {
          console.log(response);
          this.applyForm.reset();
          this.toastr.success('New user created!', 'Registration Successful');
          this.router.navigate(['/signUp']); // move navigation here
        } else {
          console.log(response);
          // this.toastr.error('Registration failed');
        }
        console.log('User registered successfully:', response);
      },
      error: (error) => {
        console.error('Registration failed:', error);
        // this.toastr.error('Registration failed', error.message);
      },
    });

    // this.userService.createUser(user);
    // this.applyForm.valid && this.router.navigate(['/signUp']);
  }
}
