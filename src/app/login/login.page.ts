import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { NavController, AlertController, LoadingController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { FCM } from '@ionic-native/fcm/ngx';

@Component({
  selector: 'app-home',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  isLoading: boolean;

  constructor(private fcm: FCM, private http: HttpClient, private router: Router, private navCtrl: NavController,
    private storage: Storage, private alert: AlertController, private loadingCtrl: LoadingController) {
    this.isLoading = true;
  }

  authenticated = false;
  loginForm: boolean;
  error: string;
  username: string;
  ngOnInit() {
    this.storage.set('inApp', false);
    this.storage.get('isLoggedIn').then((val) => {
      if (val) {
        this.router.navigate(['/tabs']).then(() => this.isLoading = false);
      }
      else {
        this.isLoading = false;
      }
    });
  }

  goToNextPage() {
    this.router.navigate(['/register']);
  }

  goToBuildPage(x) {
    const Username = x;
    this.loadingCtrl.dismiss();
    this.fcm.getToken().then(token => {
      console.log(token);
      this.storage.set('fcmToken', token);
      this.storage.get('user').then((val) => {
        var Username = val;
        const data = {
          Username,
          token
        }
        this.http.post('http://ec2-15-206-171-244.ap-south-1.compute.amazonaws.com:80/firebasetableinsert', data, { responseType: 'text' }).subscribe(
          rdata => {
            console.log(rdata);
          }
        )
      })
    });
    this.navCtrl.navigateRoot('tabs/tab1');
  }

  async loadingScreen() {
    const loading = await this.loadingCtrl.create({
      message: 'Logging in...'
    });

    await loading.present();
  }

  login(form) {
    const username = form.value.username;
    this.storage.set('user', username);
    const password = form.value.password;
    console.log(username, password);
    const data = { username, password };
    this.loadingScreen();
    this.http.post('http://ec2-15-206-171-244.ap-south-1.compute.amazonaws.com:80/login', data, { responseType: 'text' }).subscribe(
      rdata => {
        if (rdata.indexOf('AccessToken') !== -1) {
          let temp = JSON.parse(rdata);
          const AccessToken = temp.AccessToken;
          const RefreshToken = temp.RefreshToken;
          console.log(AccessToken);
          this.storage.set('AccessToken', AccessToken);
          this.storage.set('RefreshToken', RefreshToken);
          this.storage.set('inApp', true);
          this.storage.set('isLoggedIn', true);
          this.isLoading = false;
          this.goToBuildPage(username);
        }
        else {
          this.loadingCtrl.dismiss();
          console.log(rdata);
          this.error = rdata;
          this.errorAlert(this.error);
        }
      },
    );
  }

  async errorAlert(error) {
    const alert = await this.alert.create({
      header: 'Login Failed',
      message: error,
      buttons: ['OK']
    });

    await alert.present();
  }

  forgotPassword() {
    this.router.navigate(['/forgotpw']);
  }
}