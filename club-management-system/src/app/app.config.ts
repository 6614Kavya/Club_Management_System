import {
  ApplicationConfig,
  NgModule,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';

import routeConfig from './app.routes';
import {
  BrowserAnimationsModule,
  provideAnimations,
} from '@angular/platform-browser/animations';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideToastr, ToastrModule } from 'ngx-toastr';

NgModule({
  imports: [
    BrowserAnimationsModule, // <--- VERY IMPORTANT
    ToastrModule.forRoot({
      timeOut: 3000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
      progressBar: true,
      easeTime: 300, // Animation duration
      extendedTimeOut: 1000, // Time after user hovers
    }),
  ],
});

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routeConfig, withComponentInputBinding()),
    provideHttpClient(withFetch()),
    provideToastr(),
    provideAnimations(),
  ],
};
