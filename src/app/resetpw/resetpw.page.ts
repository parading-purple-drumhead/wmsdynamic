import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-resetpw',
  templateUrl: './resetpw.page.html',
  styleUrls: ['./resetpw.page.scss'],
})
export class ResetpwPage implements OnInit {

  constructor(private router: Router, private http: HttpClient, private storage: Storage) { }

  AccessToken: any;

  ngOnInit() {
    this.storage.get('AccessToken').then((val) => {
      this.AccessToken = val;
    });
  }

  changePass(form){
    const Password = form.value.oldpass;
    const NewPassword = form.value.newpass;
    const AccessToken = this.AccessToken;
    const data = {
      Password,
      NewPassword,
      AccessToken
    }
    this.http.post('http://ec2-15-206-171-244.ap-south-1.compute.amazonaws.com:80/ChangePassword', data, {responseType: 'text'}).subscribe(
      rdata => {
        console.log(rdata);
        if (rdata === "True"){
          this.router.navigate(['/login']);
        }
      }
    )
  }

}
