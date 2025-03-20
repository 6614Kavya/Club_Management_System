import { Component } from '@angular/core';
import { navBarData } from '../Data/nav-data';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-side-nav',
  imports: [RouterModule, CommonModule, MatIconModule],
  template: ` <div class="side-nav">
    <ul class="side-nav-nav">
      <li class="side-nav-item" *ngFor="let data of navData">
        <a href="" class="side-nav-link" [routerLink]="[data.routeLink]">
          <mat-icon
            class="side-nav-link-icon"
            [fontIcon]="data.icon"
          ></mat-icon>
          <span class="side-nav-link-text">{{ data.label }}</span>
        </a>
      </li>
    </ul>
  </div>`,
  styleUrl: './side-nav.component.css',
})
export class SideNavComponent {
  navData = navBarData;
}
