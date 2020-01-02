import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../services/auth.service';
import { NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage';


@Component({
  selector: 'app-home',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit{

  constructor(private http: HttpClient,private router:Router, private authService: AuthService, private navCtrl: NavController,
    private storage: Storage) { }
  
  authenticated = false;
  loginForm: boolean;
  error: string;
  username: string;

  ngOnInit(){
    this.authService.getUserSubject().subscribe(authState => {
      this.authenticated = authState? true:false;
    });
  }

  goToNextPage()
  {
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
        console.log(rdata);
        if(rdata.indexOf('AccessToken') !== -1)
        {
          this.goToBuildPage(username);          
        }
        else{
          console.log(rdata);
          this.error=rdata;
        }
      },
    );
  }
}