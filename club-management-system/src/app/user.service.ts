import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs'; //
import { jwtDecode } from 'jwt-decode';
import { User } from './user';
import { environment } from '../environments/environment.development';

export interface UserSummary {
  userId: string;
  name: string;
}

interface GetAllUsersResponse {
  result: {
    $values: UserSummary[];
  };
}

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private http = inject(HttpClient);
  private apiUrl = environment.apiURL + '/WeatherForecast';

  private registerUrl = environment.apiURL + '/api/User/register';
  private loginUrl = environment.apiURL + '/api/User/signin';

  // Emits current decoded token payload
  private decodedTokenSubject = new BehaviorSubject<any>(
    this.getDecodedToken()
  );
  public decodedToken$ = this.decodedTokenSubject.asObservable();

  constructor() {}

  public get(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  public createUser(user: User): Observable<any> {
    return this.http.post(this.registerUrl, user);
  }

  public signIn(user: User): Observable<any> {
    return this.http.post(this.loginUrl, user);
  }

  isLoggedIn(): boolean {
    return localStorage.getItem('token') != null;
  }

  getDecodedToken(): any | null {
    const token = localStorage.getItem('token');
    if (!token) return null;

    try {
      const decoded = jwtDecode<any>(token);
      return decoded;
    } catch (err) {
      console.error('Invalid token', err);
      return null;
    }
  }

  //Emits updated decoded token to subscribers

  private updateDecodedToken() {
    this.decodedTokenSubject.next(this.getDecodedToken());
  }

  getCurrentRole(): string | null {
    const payload = this.decodedTokenSubject.value;
    return payload?.ActiveRole || null;
  }

  getContextId(): string | null {
    const payload = this.decodedTokenSubject.value;
    return payload?.ContextId || null;
  }

  isClubAdmin(): boolean {
    return this.getCurrentRole() === 'ClubAdmin';
  }

  isFieldAdmin(): boolean {
    return this.getCurrentRole() === 'FieldAdmin';
  }

  isTeamManager(): boolean {
    return this.getCurrentRole() === 'TeamManager';
  }

  public getUserDetails(userId: string): Observable<any> {
    const url = `${environment.apiURL}/api/user/userDetails/${userId}`;
    const token = localStorage.getItem('token');
    console.log('Token details', this.getDecodedToken());
    return this.http.get(url);
  }

  setActiveRole(
    role: string,
    clubId?: string,
    fieldId?: string,
    teamId?: string
  ): Observable<void> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });

    const payload: any = { role };
    if (clubId) payload.clubId = clubId;
    if (fieldId) payload.fieldId = fieldId;
    if (teamId) payload.teamId = teamId;

    return new Observable<void>((observer) => {
      this.http
        .post<{ token: string }>(
          `${environment.apiURL}/api/user/set-active-role`,
          payload,
          { headers }
        )
        .subscribe({
          next: (response) => {
            localStorage.setItem('token', response.token);
            this.updateDecodedToken(); // Update subscribers
            observer.next();
            observer.complete();
          },
          error: (err) => {
            observer.error(err);
          },
        });
    });
  }

  public getAllUsers(): Observable<GetAllUsersResponse> {
    return this.http.get<GetAllUsersResponse>(
      `${environment.apiURL}/api/user/allUsers`
    );
  }
}
