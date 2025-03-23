import { Routes } from '@angular/router';
import { SignUpComponent } from './sign-up/sign-up.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ClubsComponent } from './clubs/clubs.component';
import { FieldsComponent } from './fields/fields.component';
import { TeamsComponent } from './teams/teams.component';
import { UsersComponent } from './users/users.component';

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
    children: [
      { path: 'clubs', component: ClubsComponent },
      { path: 'fields', component: FieldsComponent },
      { path: 'teams', component: TeamsComponent },
      { path: 'users', component: UsersComponent },
    ],
  },
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' }, // Default route
];

export default routeConfig;
