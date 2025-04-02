import { Injectable } from '@angular/core';
import { Clubs } from '../../Data/club-main-data';

export interface Team {
  id: number;
  team_name: string;
  team_address: string;
  team_admin: string;
}

@Injectable({
  providedIn: 'root',
})
export class TeamService {
  constructor() {}

  getTeamsByClubId(clubId: number): Team[] {
    const club = Clubs.find((c) => c.id === clubId);

    if (club) {
      return club.teams;
    } else {
      return [];
    }
  }
}
