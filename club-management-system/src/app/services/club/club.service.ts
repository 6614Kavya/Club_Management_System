import { Injectable } from '@angular/core';
import { Clubs } from '../../Data/club-main-data';

export interface Club {
  id: number;
  club_name: string;
  short_name: string;
  club_description: string;
  club_logo: string;
  club_address: string;
  country_code: string;
  activated: boolean;
  club_admins: string[];
}

@Injectable({
  providedIn: 'root',
})
export class ClubService {
  constructor() {}
  clubs = Clubs;

  getAllClubData() {
    return this.clubs;
  }

  getAllClubList(): Club[] {
    return this.clubs.map(
      ({
        id,
        club_name,
        short_name,
        club_description,
        club_logo,
        club_address,
        country_code,
        activated,
        club_admins,
      }) => ({
        id,
        club_name,
        short_name,
        club_description,
        club_logo,
        club_address,
        country_code,
        activated,
        club_admins,
      })
    );
  }
}
