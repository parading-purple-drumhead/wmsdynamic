import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-otppage',
  templateUrl: './otppage.page.html',
  styleUrls: ['./otppage.page.scss'],
})
export class OtppagePage implements OnInit {

  constructor(private route: Router, private http: HttpClient, private storage: Storage) { }

  username: any;

  ngOnInit() {
    this.storage.get('username').then((val) => {
      this.username = val;
    });
  }

  enterOTP(form){
    const code = form.value.otp;
    const Password = form.value.password;
    const Username = this.username;
    const data = {
      code,
      Password,
      Username
    }
    console.log(data)
    this.http.post('http://ec2-13-235-242-60.ap-south-1.compute.amazonaws.com:5000/confirmPass', data, {responseType: 'text'}).subscribe(
      rdata => {
        console.log(rdata);
        if(rdata === "True"){
          this.route.navigate(['/login']);
        }
      }
    )
  }
}
