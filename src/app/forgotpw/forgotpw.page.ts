import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-forgotpw',
  templateUrl: './forgotpw.page.html',
  styleUrls: ['./forgotpw.page.scss'],
})
export class ForgotpwPage implements OnInit {

  constructor(private route: Router, private http: HttpClient, private storage: Storage) { }

  ngOnInit() {
  }

  forgotPassword(form){
    const Username = form.value.username;
    this.storage.set('username', Username);
    console.log(Username);
    const data = {
      Username
    }
    this.http.post('http://ec2-13-235-242-60.ap-south-1.compute.amazonaws.com:5000/forgotpassword',data,{responseType: 'text'}).subscribe(
      rdata => {
        console.log(rdata);
        if(rdata === "True"){
          this.route.navigate(['/otppage']);
        }
        else{
          alert("User doesn't exist");
        }
      }
    )
  }
}
