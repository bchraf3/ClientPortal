import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideAuth0 } from '@auth0/auth0-angular';
import { routes } from './app.routes';
import { authInterceptor } from './interceptors/auth.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(withInterceptors([authInterceptor])),
    provideAuth0({
      domain: 'dev-3g6mtg67zy4kst47.us.auth0.com',
      clientId: 'tfCVm24xLQFmeZUrlg8iwuCfXtoBGGtt',
      authorizationParams: {
        redirect_uri: window.location.origin + '/callback',
        audience: 'https://dev-3g6mtg67zy4kst47.us.auth0.com/api/v2/'
      },
      cacheLocation: 'localstorage', // Add this line
      useRefreshTokens: true // Add this line
    })
  ]
};