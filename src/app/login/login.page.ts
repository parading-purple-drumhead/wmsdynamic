import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../services/auth.service';
import { NavController, AlertController, LoadingController } from '@ionic/angular';
import { Storage } from '@ionic/storage';


@Component({
  selector: 'app-home',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit{

  isLoading = false;

  constructor(private http: HttpClient,private router:Router, private authService: AuthService, private navCtrl: NavController,
    private storage: Storage, private alert: AlertController, private loading: LoadingController) { }
  
  authenticated = false;
  loginForm: boolean;
  error: string;
  username: string;

  ngOnInit(){
    this.authService.getUserSubject().subscribe(authState => {
      this.authenticated = authState? true:false;
    });
  }

  goToNextPage(){
    this.router.navigate(['/register']);
  }

  goToBuildPage(x){
    var username = x;
    this.authService.login(username);
    this.navCtrl.navigateRoot('tabs/tab1');
  }

  login(form)
  {
    const username=form.value.username;
    this.storage.set('user', username);
    const password=form.value.password;
    console.log(username,password);
    const data={username,password};
    this.http.post('http://ec2-13-235-242-60.ap-south-1.compute.amazonaws.com:5000/login',data,{responseType:'text'}).subscribe(
      rdata=>{
        if(rdata.indexOf('AccessToken') !== -1)
        {
          let temp = JSON.parse(rdata);
          const AccessToken = temp.AccessToken;
          console.log(AccessToken);
          this.storage.set('AccessToken', AccessToken);
          this.goToBuildPage(username);      
        }
        else{
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