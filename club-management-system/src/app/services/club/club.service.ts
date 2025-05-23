import { inject, Injectable } from '@angular/core';
import { Clubs } from '../../Data/club-main-data';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment.development';
import { Observable } from 'rxjs';

export interface Club {
  id: any;
  name: string | undefined;
  shortName?: string | undefined;
  description?: string | undefined;
  club_logo?: string | null;
  address?: string | undefined;
  countryCode?: string | undefined;
  activated?: boolean;
  clubAdmins?: string[];
  fieldList?: any[] | undefined;
  teamList?: any[] | undefined;
  userClubs?: any | null;
}

export interface Admin {
  clubName: string;
  adminName: string;
  email: string;
}

export interface AssignClubAdminRequest {
  userId: any;
  clubId: any;
  role: string;
}

@Injectable({
  providedIn: 'root',
})
export class ClubService {
  constructor() {}
  private http = inject(HttpClient);
  clubs = Clubs;

  private getClubsUrl = environment.apiURL + '/api/Club/clubs';

  // getAllClubData() {
  //   return this.clubs;
  // }

  getAllClubData(): Observable<any> {
    var response = this.http.get(this.getClubsUrl);
    console.log('Get all clubs', response);
    return response;
  }

  getAllClubs(): Observable<Club[]> {
    const url = `${environment.apiURL}/api/Club/clubs`;
    return this.http.get<Club[]>(url);
  }

  getAllClubList(): Club[] {
    return this.clubs.map(
      ({
        id,
        name,
        shortName,
        description,
        club_logo,
        address,
        countryCode,
        activated,
        club_admins,
        fieldList,
        teamList,
        userClubs,
      }) => ({
        id,
        name,
        shortName,
        description,
        club_logo,
        address,
        countryCode,
        activated,
        club_admins,
        fieldList,
        teamList,
        userClubs,
      })
    );
  }

  createClub(clubData: Partial<Club>): Observable<any> {
    const url = `${environment.apiURL}/api/Club/createClub`;
    return this.http.post(url, clubData);
  }

  updateClub(clubId: string, updatedData: Partial<Club>): Observable<any> {
    const url = `${environment.apiURL}/api/Club/updateClub/${clubId}`;
    return this.http.patch(url, updatedData);
  }

  assignClubAdmin(payload: AssignClubAdminRequest): Observable<any> {
    const url = `${environment.apiURL}/api/user/assignClubAdmin`;
    return this.http.post(url, payload);
  }
}
