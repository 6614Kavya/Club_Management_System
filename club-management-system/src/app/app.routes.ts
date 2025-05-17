import { Routes } from '@angular/router';
import { SignUpComponent } from './Forms/sign-up/sign-up.component';
import { SignInComponent } from './Forms/sign-in/sign-in.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ClubsComponent } from './clubs/clubs.component';
import { FieldsComponent } from './fields/fields.component';
import { TeamsComponent } from './teams/teams.component';
import { UsersComponent } from './users/users.component';
import { HomeDashboardComponent } from './home-dashboard/home-dashboard.component';
import { FieldTeamTabsComponent } from './field-team-tabs/field-team-tabs.component';
import { CalendarComponent } from './calendar/calendar.component';
import { BookingPageComponent } from './booking-page/booking-page.component';
import { authGuard } from './shared/auth.guard';
import { BookingRequestsComponent } from './booking-requests/booking-requests.component';

const routeConfig: Routes = [
  {
    path: '',
    component: SignInComponent,
    title: 'Signin page',
  },
  {
    path: 'signUp',
    component: SignUpComponent,
    title: 'SignUp Page',
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    // canActivate: [authGuard],
    children: [
      { path: '', component: HomeDashboardComponent, canActivate: [authGuard] },
      { path: 'clubs', component: ClubsComponent, canActivate: [authGuard] },
      { path: 'fields', component: FieldsComponent, canActivate: [authGuard] },
      { path: 'teams', component: TeamsComponent, canActivate: [authGuard] },
      { path: 'users', component: UsersComponent, canActivate: [authGuard] },
      {
        path: 'fieldTeamData/:id',
        component: FieldTeamTabsComponent,
        canActivate: [authGuard],
      },
      {
        path: 'fieldTeamData/:id/calendar/:id',
        component: CalendarComponent,
        // canActivate: [authGuard],
      },
      {
        path: 'bookingRequests',
        component: BookingRequestsComponent,
        // canActivate: [authGuard],
      },
    ],
  },

  { path: '', redirectTo: '', pathMatch: 'full' }, // Default route
];

export default routeConfig;
