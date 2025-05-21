import { Component, OnDestroy } from '@angular/core';
import { navBarData } from '../Data/nav-data';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { UserService } from '../user.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-side-nav',
  standalone: true,
  imports: [RouterModule, CommonModule, MatIconModule],
  template: `
    <div class="side-nav">
      <ul class="side-nav-nav">
        <li class="side-nav-item" *ngFor="let data of filteredNavData">
          <a class="side-nav-link" [routerLink]="data.routeLink">
            <mat-icon
              class="side-nav-link-icon"
              [fontIcon]="data.icon"
            ></mat-icon>
            <span class="side-nav-link-text">{{ data.label }}</span>
          </a>
        </li>
      </ul>
    </div>
  `,
  styleUrl: './side-nav.component.css',
})
export class SideNavComponent implements OnDestroy {
  navData = navBarData;
  filteredNavData: any[] = [];
  private subscription: Subscription;

  constructor(private userService: UserService) {
    // Subscribe to token changes then filter items
    this.subscription = this.userService.decodedToken$.subscribe((token) => {
      const role = token?.ActiveRole ?? 'IndividualUser';
      this.filteredNavData = this.navData.filter((item) =>
        item.roles.includes(role)
      );
    });
  }

  ngOnDestroy(): void {
    // Clean up subscription when component is destroyed
    this.subscription.unsubscribe();
  }
}
