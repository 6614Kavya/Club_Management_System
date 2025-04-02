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
      { path: '', component: HomeDashboardComponent },
      { path: 'clubs', component: ClubsComponent },
      { path: 'fields', component: FieldsComponent },
      { path: 'teams', component: TeamsComponent },
      { path: 'users', component: UsersComponent },
      { path: 'fieldTeamData', component: FieldTeamTabsComponent },
    ],
  },
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' }, // Default route
];

export default routeConfig;
