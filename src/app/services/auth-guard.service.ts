import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Router, CanActivate } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private storage: Storage, private router: Router, private http: HttpClient) { }

  canActivate(): Promise<boolean> {
    return new Promise((resolve) => this.storage.get('inApp').then(inApp => {
      if(inApp) {
        resolve(true);
      }
      else{
        this.storage.get('RefreshToken').then(RefreshToken => {
          if(RefreshToken === null){
            this.storage.set('isLoggedIn',false);
            this.router.navigate(['/']);
            window.location.reload();
            resolve(false);
          }
        });
      }
    }));
  }
}