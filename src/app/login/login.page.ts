import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { NavController, AlertController, LoadingController } from '@ionic/angular';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-home',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit{

  isLoading = false;
  // loading: any;

  constructor(private http: HttpClient,private router:Router, private navCtrl: NavController,
    private storage: Storage, private alert: AlertController, private loadingCtrl: LoadingController) {}
  
  authenticated = false;
  loginForm: boolean;
  error: string;
  username: string;

  ngOnInit(){
    this.storage.set('inApp',false);
  }

  goToNextPage(){
    this.router.navigate(['/register']);
  }

  goToBuildPage(x){
    this.loadingCtrl.dismiss();
    this.navCtrl.navigateRoot('tabs/tab1');
  }

  async loadingScreen(){
    const loading = await this.loadingCtrl.create({
      message: 'Logging in...'
    });

    await loading.present();
  }

  login(form)
  {
    const username=form.value.username;
    this.storage.set('user', username);
    const password=form.value.password;
    console.log(username,password);
    const data={username,password};
    this.loadingScreen();
    this.http.post('http://ec2-13-233-247-42.ap-south-1.compute.amazonaws.com:5000/login',data,{responseType:'text'}).subscribe(
      rdata=>{
        if(rdata.indexOf('AccessToken') !== -1)
        {
          let temp = JSON.parse(rdata);
          const AccessToken = temp.AccessToken;
          const RefreshToken = temp.RefreshToken;
          console.log(AccessToken);
          this.storage.set('AccessToken', AccessToken);
          this.storage.set('RefreshToken',RefreshToken);
          this.storage.set('inApp',true);
          this.goToBuildPage(username);      
        }
        else{
          this.loadingCtrl.dismiss();
          console.log(rdata);
          this.error=rdata;
          this.errorAlert(this.error);
        }
      },
    );
  }

  async errorAlert(error){
      const alert = await this.alert.create({
        header: 'Login Failed',
        message: error,
        buttons: ['OK']
      });
  
      await alert.present();
  }

  forgotPassword(){
    this.router.navigate(['/forgotpw']);
  }
}