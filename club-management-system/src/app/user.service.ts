import { Injectable, inject } from '@angular/core';
import { User } from './user';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment.development';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor() {}

  // createUser(user: User) {
  //   return console.log(user);
  // }

  private http = inject(HttpClient);
  private apiUrl = environment.apiURL + '/WeatherForecast';

  private registerUrl = environment.apiURL + '/api/User/register';
  private loginUrl = environment.apiURL + '/api/User/signin';

  public get(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  public createUser(user: User): Observable<any> {
    return this.http.post(this.registerUrl, user);
  }

  public signIn(user: User): Observable<any> {
    return this.http.post(this.loginUrl, user);
  }

  isLoggedIn() {
    return localStorage.getItem('token') != null ? true : false;
  }
}
