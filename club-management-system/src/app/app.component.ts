import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SignInComponent } from './sign-in/sign-in.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterModule],
  template: ` <section>
    <router-outlet></router-outlet>
  </section>`,
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'club-management-system';
}
