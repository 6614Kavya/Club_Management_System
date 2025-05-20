import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SideNavComponent } from '../side-nav/side-nav.component';
import { RouterModule } from '@angular/router';
import { UserService } from '../user.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  imports: [SideNavComponent, RouterModule, FormsModule, CommonModule],
  template: `
    <div class="dashboard-container">
      <div class="role-switcher">
        <!-- Role Type Dropdown -->
        <label>
          Role:
          <select
            [(ngModel)]="selectedRole"
            (ngModelChange)="onRoleChange($event)"
          >
            <option value="ClubAdmin">Club Admin</option>
            <option value="FieldAdmin">Field Admin</option>
          </select>
        </label>

        <!-- Club Selector -->
        <label *ngIf="selectedRole === 'ClubAdmin'">
          Club:
          <select
            [(ngModel)]="selectedClubId"
            (ngModelChange)="onContextChange()"
          >
            <option *ngFor="let club of clubRoles" [value]="club.clubId">
              {{ club.clubName }}
            </option>
          </select>
        </label>

        <!-- Field Selector -->
        <label *ngIf="selectedRole === 'FieldAdmin'">
          Field:
          <select
            [(ngModel)]="selectedFieldId"
            (ngModelChange)="onContextChange()"
          >
            <option *ngFor="let field of fieldRoles" [value]="field.fieldId">
              {{ field.fieldName }}
            </option>
          </select>
        </label>
      </div>

      <app-side-nav class="side-nav"></app-side-nav>

      <div class="content">
        <router-outlet></router-outlet>
      </div>

      <!-- <div><p>hiiiiiiiiiiiiii</p></div> -->
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
      },
      error: (err) => {
        console.error('Error fetching user details', err);
      },
    });
  }

  onRoleChange(newRole: string) {
    this.selectedClubId = '';
    this.selectedFieldId = '';
    this.onContextChange();
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
