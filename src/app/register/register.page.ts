import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
 
  registerForm: boolean;
  error: string;
  register(form) {
    
    const email = form.value.email;
    const password = form.value.password;
    const username = form.value.username;
    console.log(username,email,password);
    const exp = new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})');
    if (!exp.test(password)) {
      alert('Your password should be atleast eight letters long and must contain atleast\
      one uppercase letter,one number and a special symbol');
      return;
    }
    const data = {
      username,
      email,
      password,
    };
    this.http.post('http://ec2-13-235-242-60.ap-south-1.compute.amazonaws.com:5000/signup', data, { responseType: 'text' }).subscribe(
      rdata => {
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

  ngOnInit() {}

  HomePage()
  {
    this.router.navigate(['/login']);
  }
  constructor(private http: HttpClient,private router:Router) { }
}

