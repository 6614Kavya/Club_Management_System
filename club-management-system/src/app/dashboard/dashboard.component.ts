import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  imports: [],
  template: `
    <p>dashboard works!</p>
    <p>{{ email }}</p>
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
