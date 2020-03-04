import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-otppage',
  templateUrl: './otppage.page.html',
  styleUrls: ['./otppage.page.scss'],
})
export class OtppagePage implements OnInit {

 // constructor(private route: Router, private http: HttpClient, private storage: Storage) { }

  username: any;
    constructor(private http: HttpClient, private router: Router, public formBuilder: FormBuilder, private alert: AlertController, private storage: Storage) {
    this.loginForm = this.formBuilder.group({
      password: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9!@#$%]+$'),
        Validators.minLength(8),
        Validators.maxLength(15),
      ])),
      confirmpassword: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9!@#$%]+$'),
        Validators.minLength(8),
        Validators.maxLength(15),
      ])),
      otp: new FormControl('', Validators.compose([
        Validators.required,
        
        Validators.maxLength(6)
      ])),
    });
  }

  ngOnInit() {
    this.storage.get('username').then((val) => {
      this.username = val;
    });
  }
  loginForm: FormGroup;

  error_messages = {
    'password': [
      {type : 'pattern', message: 'Password must contain atleast 1 Uppercase, Lowercase and Special Character'},
      { type: 'required', message: 'Please enter the password' },
      { type: 'minlength', message: 'Minimum password length is 8.' },
      { type: 'maxlength', message: 'Password should not exceed 15 letters' }
    ],
    'confirmpassword': [
      {type : 'pattern', message: 'Password must contain atleast 1 Uppercase, Lowercase and Special Character'},
      { type: 'required', message: 'Please enter the password' },
      { type: 'minlength', message: 'Minimum password length is 8.' },
      { type: 'maxlength', message: 'Password should not exceed 15 letters' }
    ],
    'otp': [
      { type: 'required', message: 'Please enter the Email ID' }
    ]
  }

  otppage(form){
    const code = form.value.otp;
    const Password = form.value.password;
    const Username = this.username;
    const CPassword = form.value.confirmpassword;
    const data = {
      code,
      Password,
      Username
    }
    console.log(data)
    if (Password === CPassword){
      this.http.post('http://ec2-3-6-36-255.ap-south-1.compute.amazonaws.com:5000/confirmPass', data, {responseType: 'text'}).subscribe(
      rdata => {
        console.log(rdata);
        if(rdata === "True"){
          this.router.navigate(['/login']);
        }
      }
    )
    }
    else {
      this.errorAlert();
    }
  }

  async errorAlert(){
    const alert = await this.alert.create({
      header: 'Re-type Passwords',
      message: 'Passwords do not match',
      buttons: ['OK']
    });
    await alert.present();
}
}
