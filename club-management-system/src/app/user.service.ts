import { Injectable, inject } from '@angular/core';
import { User } from './user';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../environments/environment.development';
import { Observable } from 'rxjs';
import { jwtDecode } from 'jwt-decode';

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

  getDecodedToken(): any | null {
    const token = localStorage.getItem('token'); // or sessionStorage
    if (!token) return null;

    try {
      const decoded = jwtDecode<any>(token);
      console.log('Decoded JWT', decoded);
      return decoded;
    } catch (err) {
      console.error('Invalid token', err);
      return null;
    }
  }

  public getUserDetails(userId: string): Observable<any> {
    const url = `${environment.apiURL}/api/user/userDetails/${userId}`;
    return this.http.get(url);
  }

  setActiveRole(role: string, clubId?: string, fieldId?: string) {
    const token = localStorage.getItem('token');

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });

    const payload: any = { role };
    if (clubId) payload.clubId = clubId;
    if (fieldId) payload.fieldId = fieldId;

    return this.http.post<{ token: string }>(
      'https://localhost:7213/api/user/set-active-role',
      payload,
      { headers }
    );
  }
}
