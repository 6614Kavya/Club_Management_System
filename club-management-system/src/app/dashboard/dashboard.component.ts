import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SideNavComponent } from '../side-nav/side-nav.component';
import { RouterModule } from '@angular/router';
import { UserService } from '../user.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-dashboard',
  imports: [
    SideNavComponent,
    RouterModule,
    FormsModule,
    CommonModule,
    MatFormFieldModule,
    MatSelectModule,
    MatIconModule,
    MatMenuModule,
    MatButtonModule,
  ],
  template: `
    <div class="dashboard-container">
      <!-- Top Navbar -->
      <header class="top-navbar">
        <div class="navbar-left">
          <!-- <img src="assets/logo.png" alt="App Logo" class="app-logo" /> -->
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
          <div>
            <!-- <mat-icon
              class="icon"
              fontSet="material-icons"
              (click)="goToMyProfile()"
              >person</mat-icon
            > -->
            <button
              class="icon"
              matIconButton
              [matMenuTriggerFor]="menu"
              aria-label="Example icon-button with a menu"
            >
              <mat-icon style="font-size: 30px;">person</mat-icon>
            </button>
            <mat-menu #menu="matMenu">
              <button mat-menu-item (click)="goToMyProfile()">
                <mat-icon>person</mat-icon>
                <span>My Profile</span>
              </button>
              <button mat-menu-item (click)="onLogout()">
                <mat-icon style="color: red;">logout</mat-icon>
                <span style="color: red;">Logout</span>
              </button>
            </mat-menu>
            <!-- <span>My Profile</span> -->
          </div>
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
  onLogout() {
    this.userService.logout();
    this.router.navigate(['/signUp']);
  }
  goToMyProfile() {
    this.router.navigate(['/dashboard/myProfile']);
  }
  submitActiveRole() {
    throw new Error('Method not implemented.');
  }
  email!: string;

  currentUserPayload: any;

  userService: UserService = inject(UserService);

  selectedRole = '';
  selectedClubId = '';
  selectedFieldId = '';
  selectedTeamId = '';

  selectedRoleContext: any;
  roleOptions: any[] = [];

  clubRoles: any[] = [];
  fieldRoles: any[] = [];
  teamRoles: any[] = [];

  constructor(private route: ActivatedRoute, private router: Router) {
    this.route.queryParams.subscribe((params) => {
      this.email = params['email'] || 'No email provided';
    });

    this.currentUserPayload = this.userService.getDecodedToken();

    if (this.currentUserPayload?.IsSuperAdmin === 'True') {
      this.roleOptions.push({
        display: 'Super Admin',
        role: 'SuperAdmin',
      });
    }

    const userId = this.currentUserPayload.nameid;
    this.userService.getUserDetails(userId).subscribe({
      next: (res) => {
        console.log('User Details:', res);

        this.clubRoles = res.clubRoles?.$values || [];
        this.fieldRoles = res.fieldRoles?.$values || [];
        this.teamRoles = res.teamRoles?.$values || [];

        this.roleOptions = [
          ...this.roleOptions,
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
          ...this.teamRoles.map((team) => ({
            display: `Team Manager - ${team.teamName}`,
            role: 'TeamManager',
            teamId: team.teamId,
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
    this.selectedTeamId = context.teamId || '';

    this.onContextChange(); // Call your existing method
  }

  onContextChange() {
    this.userService
      .setActiveRole(
        this.selectedRole,
        this.selectedClubId || undefined,
        this.selectedFieldId || undefined,
        this.selectedTeamId || undefined
      )
      .subscribe({
        next: () => {
          const newPayload = this.userService.getDecodedToken();
          console.log('Role switched to:', newPayload?.role);
          console.log('New context ID:', newPayload?.ContextId);
          // Optionally refresh the view or reload the component/router
          this.router.navigate(['/dashboard']);
        },
        error: (err) => {
          console.error('Failed to set active role', err);
        },
      });
  }
}
