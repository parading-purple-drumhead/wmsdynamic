import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  constructor(private http: HttpClient,private router:Router,public formBuilder: FormBuilder) {
    this.loginForm = this.formBuilder.group({
      password: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(15),
        // Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})')
      ])),
      email: new FormControl('',Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[srmist/srmuniv]+.edu.in+$')
        ,
      ])),
      username: new FormControl('',Validators.compose([
        Validators.required,
      ]))
    });
   }

  ngOnInit() {}

  loginForm: FormGroup;

  error_messages = {
    'password': [
      { type: 'required', message: 'Please enter the password'},
      { type: 'minlength', message: 'Password should contain minimum 6 letters.'},
      { type: 'maxlength', message: 'Password should not exceed 15 letters'}
    ],
    'email': [
      { type: 'required', message: 'Please enter the Email ID'},
      { type: 'pattern', message: 'Please use your college email ID'}
      
    ],
    'username': [
      { type: 'required', message: 'Please enter your Name'},
    ],
  }
 
  registerForm: boolean;
  error: string;
  register(form) {
    
    const email = form.value.email;
    const password = form.value.password;
    const username = form.value.username;
    const data = {
      username,
      email,
      password,
    };
    console.log(data);
    this.http.post('http://ec2-13-235-242-60.ap-south-1.compute.amazonaws.com:5000/signup', data, { responseType: 'text' }).subscribe(
      rdata => {
        console.log(rdata);
        if (rdata === 'True') {
         console.log("Registered Successfully");
         this.router.navigate(['/login']);
        } else {
          console.log(rdata);
          this.error = rdata;
        }
      },        
      );
  }
}


