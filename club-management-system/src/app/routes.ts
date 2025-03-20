import { Routes } from '@angular/router';
import { SignUpComponent } from './sign-up/sign-up.component';

const routeConfig: Routes = [
  {
    path: 'signUp',
    component: SignUpComponent,
    title: 'SignUp Page',
  },
];

export default routeConfig;
