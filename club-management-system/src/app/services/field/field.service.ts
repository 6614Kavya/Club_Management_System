import { inject, Injectable } from '@angular/core';
import { Clubs } from '../../Data/club-main-data';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment.development';
import { Observable } from 'rxjs';

// export interface Field {
//   id: any;
//   name: string | undefined;
//   address: string | undefined;
//   field_admins: string[] | undefined;
//   description: string | undefined;
//   field_image?: string | undefined;
//   facilities?: string[] | undefined;
// }

export interface Field {
  id: any;
  name: string | null;
  address: string | null;
  description: string | null;
  hasLighting: boolean;
  hasHeating: boolean;
  clubId: string;
  clubName: string;
  fieldAdmins: any[];
  field_image?: string;
  facilities?: string[];
}

@Injectable({
  providedIn: 'root',
})
export class FieldService {
  constructor() {}

  private http = inject(HttpClient);
  private getFieldsByClubIdUrl =
    environment.apiURL + '/api/Field/${clubId}/fields';

  private getFieldDetailsByIdUrl = environment.apiURL + '/api/Field/${id}';

  getFieldsByClubId(clubId: any): Observable<any> {
    // const club = Clubs.find((c) => c.id === clubId);

    // if (club) {
    //   // return club.fields;
    //   return [];
    // } else {
    //   return [];
    // }
    return this.http.get(environment.apiURL + `/api/Field/${clubId}/fields`);
  }

  getFieldDetailsById(fieldId: any): Observable<any> {
    return this.http.get(environment.apiURL + `/api/Field/${fieldId}`);
  }

  getAllFields(): Observable<Field[]> {
    const url = `${environment.apiURL}/api/Field`;
    return this.http.get<Field[]>(url);
  }
}
