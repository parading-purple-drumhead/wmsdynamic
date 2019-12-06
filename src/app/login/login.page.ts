import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  
  loginForm: boolean;
  error: string;
 
  goToNextPage()
  {
    this.router.navigate(['/register']);
  }

  constructor(private http: HttpClient,private router:Router) 
  {

  }
  login(form)
  {
    const username=form.value.username;
    const password=form.value.password;
    const data={username,password};
    this.http.post('http://ec2-13-127-250-134.ap-south-1.compute.amazonaws.com:5000/login',data,{responseType:'text'}).subscribe(
      rdata=>{
        console.log(rdata);
        if(rdata.indexOf('AccessToken')!== -1)
        {
        this.router.navigate(['/tabs']);}
        else{
          console.log(rdata);
          this.error=rdata;
        }
      },
    );
  }
}