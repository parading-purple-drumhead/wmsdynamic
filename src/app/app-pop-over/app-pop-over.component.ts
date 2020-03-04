import { Component, OnInit } from '@angular/core';
import { PopoverController, NavController, AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-app-pop-over',
  templateUrl: './app-pop-over.component.html',
  styleUrls: ['./app-pop-over.component.scss'],
})
export class AppPopOverComponent implements OnInit {

  constructor(private popover: PopoverController,private router: Router, private http: HttpClient, private navCtrl: NavController,
    private storage: Storage, private alert: AlertController) { }

  AccessToken: any;

  ngOnInit() {
    this.storage.get('AccessToken').then((val) => {
      this.AccessToken = val;
    });
  }

  aboutUs(){
    this.router.navigate(['/aboutus']);
    this.popover.dismiss();
  }

  resetPassword(){
    this.router.navigate(['/resetpw']);
    this.popover.dismiss();
  }

  logout(){
    var AccessToken = this.AccessToken;
    const data = {
      AccessToken
    }
    this.http.post('http://ec2-3-6-36-255.ap-south-1.compute.amazonaws.com:5000/logout',data,{responseType: 'text'}).subscribe(
      rdata => {
        console.log(rdata);
      }
    )
    this.storage.set('isLoggedIn',false);
    this.navCtrl.navigateRoot('/');
    this.popover.dismiss();
  }

  async confirmLogout(){
    const alert = await this.alert.create({
      header: 'Confirm Logout',
      message: 'Are you sure you want to logout?',
      buttons: [{
        text: 'Cancel',
        role: 'cancel',
        handler: (cancel) => {
          console.log('Cancelled');
        } 
      },
      {
        text: 'Okay',
        handler: () => {
          this.logout();
        }
      }
    ]
    });
    await alert.present();
    let result = await alert.onDidDismiss();
  }

}
