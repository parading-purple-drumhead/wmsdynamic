import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface User {
  name: string;
  roles: string[];
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  currentUser: BehaviorSubject<User> = new BehaviorSubject(null);

  constructor() { }

  login(username){
    if (username === 'management'){
      this.currentUser.next({
        name: 'Management',
        roles: ['management']
      });
    }
    else {
      this.currentUser.next({
        name: 'Student',
        roles: ['student']
      });
    }
  }

  getUserSubject(){
    return this.currentUser.asObservable();
  }

  logout(){
    this.currentUser.next(null);
  }

  hasRoles(roles: string[]): boolean{
    for(const oneRole of roles){
      if(!this.currentUser || !this.currentUser.value.roles.includes(oneRole)){
        return false;
      }

      return true;
    }
  }
}
