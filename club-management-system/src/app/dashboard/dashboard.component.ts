import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SideNavComponent } from '../side-nav/side-nav.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  imports: [SideNavComponent, RouterModule],
  template: `
    <div class="dashboard-container">
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
  email!: string;

  constructor(private route: ActivatedRoute) {
    this.route.queryParams.subscribe((params) => {
      this.email = params['email'] || 'No email provided';
    });
  }
}
