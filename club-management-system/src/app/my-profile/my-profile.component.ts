import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { UserService } from '../user.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-my-profile',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
  template: `
    <div class="container" [formGroup]="profileForm">
      <mat-form-field appearance="fill">
        <mat-label>Username</mat-label>
        <input matInput formControlName="username" />
      </mat-form-field>

      <mat-form-field appearance="fill">
        <mat-label>Email</mat-label>
        <input matInput formControlName="email" type="email" />
      </mat-form-field>

      <mat-form-field appearance="fill">
        <mat-label>Current Password</mat-label>
        <input matInput formControlName="currentPassword" type="password" />
      </mat-form-field>

      <mat-form-field appearance="fill">
        <mat-label>New Password</mat-label>
        <input matInput formControlName="newPassword" type="password" />
      </mat-form-field>

      <mat-form-field appearance="fill">
        <mat-label>Confirm Password</mat-label>
        <input matInput formControlName="confirmPassword" type="password" />
      </mat-form-field>

      <div class="button-container">
        <button
          mat-raised-button
          (click)="submit()"
          [disabled]="profileForm.invalid"
        >
          Save Changes
        </button>
      </div>
    </div>
  `,
  styleUrl: './my-profile.component.css',
})
export class MyProfileComponent implements OnInit {
  profileForm!: FormGroup;

  username: string = '';
  email: string = '';
  userId: string = '';

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    // Step 1: Build the form with empty/default values
    this.profileForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      currentPassword: ['', Validators.required],
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
    });

    // Step 2: Get token to extract user ID
    const decodedToken = this.userService.getDecodedToken();
    this.userId = decodedToken?.nameid; // Or use whatever field contains user ID

    if (this.userId) {
      // Step 3: Call getUserDetails and patch form once data is retrieved
      this.userService.getUserDetails(this.userId).subscribe({
        next: (userDetails) => {
          console.log('User details in my profile', userDetails);
          this.profileForm.patchValue({
            username: userDetails.email,
            email: userDetails.email,
          });
        },
        error: (err) => {
          console.error('Failed to get user details:', err);
        },
      });
    }
  }

  submit() {
    const { currentPassword, newPassword, confirmPassword } =
      this.profileForm.value;

    if (newPassword !== confirmPassword) {
      // alert('New password and confirmation do not match.');
      this.toastr.error(
        'New password and confirmation do not match.',
        'Failed to change password'
      );
      return;
    }

    this.userService.updatePassword(currentPassword, newPassword).subscribe({
      next: () => this.toastr.success('Password updated successfully!'),
      error: (err) => {
        // console.error('Failed to update password', err);
        // this.toastr.error('Failed to update password')
        alert('Failed to update password');
      },
    });
  }
}
