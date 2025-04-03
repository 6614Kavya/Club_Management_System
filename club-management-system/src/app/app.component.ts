import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SignInComponent } from './Forms/sign-in/sign-in.component';
import { RouterModule } from '@angular/router';
// import { FullCalendarModule } from '@fullcalendar/angular';
// import { CalendarOptions } from '@fullcalendar/core'; // useful for typechecking
// import dayGridPlugin from '@fullcalendar/daygrid';

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
  // calendarOptions: CalendarOptions = {
  //   initialView: 'dayGridMonth',
  //   plugins: [dayGridPlugin],
  // };
}
