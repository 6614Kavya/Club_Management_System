import { inject, Injectable } from '@angular/core';
import { Clubs } from '../../Data/club-main-data';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment.development';
import { Observable } from 'rxjs';

export interface Club {
  id: number;
  name: string | undefined;
  shortName: string | undefined;
  description: string | undefined;
  club_logo?: string | null;
  address: string | undefined;
  countryCode: string | undefined;
  activated: boolean;
  club_admins: string[];
  fieldList: any[] | undefined;
  teamList: any[] | undefined;
  userClubs?: any | null;
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
}
