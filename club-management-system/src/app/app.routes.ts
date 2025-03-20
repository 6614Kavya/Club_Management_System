import { Routes } from '@angular/router';
import { SignUpComponent } from './sign-up/sign-up.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { DashboardComponent } from './dashboard/dashboard.component';

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
    title: 'Dashboard',
  },
];

export default routeConfig;
