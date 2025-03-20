import { Injectable } from '@angular/core';
import { User } from './user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor() {}

  createUser(user: User) {
    return console.log(user);
  }
}
