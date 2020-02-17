import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { CompareValidatorDirective } from '../directives/compare-validator.directive';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  constructor(private http: HttpClient, private router: Router, public formBuilder: FormBuilder, private alert: AlertController) {
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
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[srmist/srmuniv]+.edu.in+$')
        ,
      ])),
    });
  }

  ngOnInit() { }

  loginForm: FormGroup;

  error_messages = {
    'password': [
      {type : 'pattern', message: 'Password must contain atleast 1 Uppercase, Lowercase and Special Character'},
      { type: 'required', message: 'Please enter the password' },
      { type: 'minlength', message: 'Minimum password length is 8.' },
      { type: 'maxlength', message: 'Password should not exceed 15 letters' }
    ],
    'email': [
      { type: 'required', message: 'Please enter the Email ID' },
      { type: 'pattern', message: 'Please use your college email ID' }
    ],
    'confirmpassword': [
      {type : 'pattern', message: 'Password must contain atleast 1 Uppercase, Lowercase and Special Character'},
      { type: 'required', message: 'Please enter the password' },
      { type: 'minlength', message: 'Minimum password length is 8.' },
      { type: 'maxlength', message: 'Password should not exceed 15 letters' }
    ],
  }

  registerForm: boolean;
  error: string;

  register(form) {
    const email = form.value.email;
    const password = form.value.password;
    const confirmpassword = form.value.confirmpassword;
    const username = form.value.email;
    const data = {
      username,
      email,
      password,
    };
<<<<<<< HEAD
    console.log(data);
    this.http.post('http://ec2-3-6-36-255.ap-south-1.compute.amazonaws.com:5000/signup', data, { responseType: 'text' }).subscribe(
      rdata => {
        console.log(rdata);
        if (rdata === 'True'){
          alert("Registered Successfully");
          this.router.navigate(['/login']);
        }
        else{
          this.error = rdata;
          alert(this.error);
=======
    if(password==confirmpassword){
      console.log(data);
      this.http.post('http://ec2-13-233-247-42.ap-south-1.compute.amazonaws.com:5000/signup', data, { responseType: 'text' }).subscribe(
        rdata => {
          console.log(rdata);
          if (rdata === 'True') {
           alert("Registered Successfully");
           this.router.navigate(['/login']);
          } else {
            console.log(rdata);
            this.error = rdata;
            alert(this.error);
>>>>>>> d2dda332e014a86f6185075d34cf802885d8dd37
        }
      },
    );
  }
<<<<<<< HEAD
}
=======
  else
  this.passalert();
}

async passalert(){
  const alert = await this.alert.create({
    header: 'Login Failed',
    message: 'Password is not the same as Confirm Password',
    buttons: ['OK']
  });

  await alert.present();
 }
}

>>>>>>> d2dda332e014a86f6185075d34cf802885d8dd37
