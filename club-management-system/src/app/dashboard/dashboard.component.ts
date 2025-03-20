import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SideNavComponent } from '../side-nav/side-nav.component';

@Component({
  selector: 'app-dashboard',
  imports: [SideNavComponent],
  template: `
    <p>dashboard works!</p>
    <p>{{ email }}</p>
    <app-side-nav></app-side-nav>
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
