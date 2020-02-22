import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private storage: Storage, private router: Router, private http: HttpClient) { }

  canActivate(): Promise<boolean> {
    return new Promise((resolve) => this.storage.get('inApp').then(inApp => {
      if (inApp) {
        resolve(true);
      } else {
        this.storage.get('RefreshToken').then(refreshToken => {
          if (refreshToken === null) {
            this.storage.set('isLoggedIn', false);
            this.router.navigate(['/']);
            window.location.reload();
            resolve(false);
          } else {
            this.http.post('http://ec2-3-6-36-255.ap-south-1.compute.amazonaws.com:5000/refreshToken', { refreshToken }, { responseType: 'text' }).subscribe(val => {
              if (val.indexOf('AccessToken') === -1) {
                this.storage.set('isLoggedIn', false);
                this.router.navigate(['/']);
                window.location.reload();
                resolve(false);
              }
              else {
                const res = JSON.parse(val);
                this.storage.set('AccessToken', res.AccessToken);
                this.storage.set('inApp', true);
                resolve(true);
              }
            });
          }
        });
      }
    }));
  }
}
