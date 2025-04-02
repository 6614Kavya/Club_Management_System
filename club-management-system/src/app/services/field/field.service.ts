import { Injectable } from '@angular/core';
import { Clubs } from '../../Data/club-main-data';

export interface Field {
  id: number;
  field_name: string;
  field_address: string;
  field_admins: string[];
  field_description: string;
  facilities: string[];
}

@Injectable({
  providedIn: 'root',
})
export class FieldService {
  constructor() {}

  getFieldsByClubId(clubId: number): Field[] {
    const club = Clubs.find((c) => c.id === clubId);

    if (club) {
      return club.fields;
    } else {
      return [];
    }
  }
}
