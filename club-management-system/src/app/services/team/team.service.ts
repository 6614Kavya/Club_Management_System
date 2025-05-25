import { inject, Injectable } from '@angular/core';
import { Clubs } from '../../Data/club-main-data';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';

// export interface Team {
//   id: number;
//   team_name: string;
//   team_address: string;
//   team_admin: string;
//   team_logo: string;
// }

export interface Team {
  id: any;
  name: string | null;
  clubId: string;
  clubName: string;
  teamManagers: any[];
  team_logo?: string;
}

export interface TeamManager {
  teamName: string;
  adminName: string;
  email: string;
}

@Injectable({
  providedIn: 'root',
})
export class TeamService {
  constructor() {}

  private http = inject(HttpClient);

  // getTeamsByClubId(clubId: string): Team[] {
  //   const club = Clubs.find((c) => c.id === clubId);

  //   if (club) {
  //     // return club.teams;
  //     return [];
  //   } else {
  //     return [];
  //   }
  // }

  getAllTeams(): Observable<Team[]> {
    const url = `${environment.apiURL}/api/Team`;
    return this.http.get<Team[]>(url);
  }

  getTeamsByClubId(clubId: any): Observable<any> {
    // const club = Clubs.find((c) => c.id === clubId);

    // if (club) {
    //   // return club.fields;
    //   return [];
    // } else {
    //   return [];
    // }
    return this.http.get(environment.apiURL + `/api/Team/${clubId}/teams`);
  }

  deleteTeam(teamId: string): Observable<any> {
    const url = `${environment.apiURL}/api/Team/${teamId}`;
    return this.http.delete(url);
  }
}
