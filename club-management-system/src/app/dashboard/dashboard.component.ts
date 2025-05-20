import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SideNavComponent } from '../side-nav/side-nav.component';
import { RouterModule } from '@angular/router';
import { UserService } from '../user.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-dashboard',
  imports: [
    SideNavComponent,
    RouterModule,
    FormsModule,
    CommonModule,
    MatFormFieldModule,
    MatSelectModule,
  ],
  template: `
    <div class="dashboard-container">
      <!-- Top Navbar -->
      <header class="top-navbar">
        <div class="navbar-left">
          <img src="assets/logo.png" alt="App Logo" class="app-logo" />
          <span class="app-title">Club Arena</span>
        </div>

        <div class="navbar-right">
          <mat-form-field>
            <mat-label>Select Role</mat-label>
            <mat-select
              [(ngModel)]="selectedRoleContext"
              (selectionChange)="onUnifiedRoleChange()"
            >
              <mat-option *ngFor="let option of roleOptions" [value]="option">
                {{ option.display }}
              </mat-option>
            </mat-select>
          </mat-form-field>
        </div>
      </header>

      <!-- Main Layout -->
      <div class="main-layout">
        <app-side-nav class="side-nav"></app-side-nav>

        <div class="content">
          <router-outlet></router-outlet>
        </div>
      </div>
    </div>
  `,
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent {
  submitActiveRole() {
    throw new Error('Method not implemented.');
  }
  email!: string;

  currentUserPayload: any;

  userService: UserService = inject(UserService);

  selectedRole = '';
  selectedClubId = '';
  selectedFieldId = '';

  selectedRoleContext: any;
  roleOptions: any[] = [];

  clubRoles: any[] = [];
  fieldRoles: any[] = [];

  constructor(private route: ActivatedRoute) {
    this.route.queryParams.subscribe((params) => {
      this.email = params['email'] || 'No email provided';
    });

    this.currentUserPayload = this.userService.getDecodedToken();

    const userId = this.currentUserPayload.nameid;
    this.userService.getUserDetails(userId).subscribe({
      next: (res) => {
        console.log('User Details:', res);

        this.clubRoles = res.clubRoles?.$values || [];
        this.fieldRoles = res.fieldRoles?.$values || [];

        this.roleOptions = [
          ...this.clubRoles.map((club) => ({
            display: `Club Admin - ${club.clubName}`,
            role: 'ClubAdmin',
            clubId: club.clubId,
          })),
          ...this.fieldRoles.map((field) => ({
            display: `Field Admin - ${field.fieldName}`,
            role: 'FieldAdmin',
            fieldId: field.fieldId,
          })),
        ];
      },
      error: (err) => {
        console.error('Error fetching user details', err);
      },
    });
  }

  onUnifiedRoleChange() {
    const context = this.selectedRoleContext;
    this.selectedRole = context.role;
    this.selectedClubId = context.clubId || '';
    this.selectedFieldId = context.fieldId || '';

    this.onContextChange(); // Call your existing method
  }

  onContextChange() {
    const payload: any = {
      role: this.selectedRole,
    };
    if (this.selectedRole === 'ClubAdmin') {
      payload.clubId = this.selectedClubId;
    } else if (this.selectedRole === 'FieldAdmin') {
      payload.fieldId = this.selectedFieldId;
    }

    console.log('role switch:', payload);

    this.userService
      .setActiveRole(
        this.selectedRole,
        this.selectedClubId,
        this.selectedFieldId
      )
      .subscribe({
        next: (response) => {
          const newToken = response.token;
          localStorage.setItem('token', newToken);
          console.log('New token:', response.token);
          console.log('Token updated');
        },
        error: (err) => {
          console.error('Failed to set active role', err);
        },
      });
  }
}
