import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.page.html',
  styleUrls: ['./feedback.page.scss'],
})
export class FeedbackPage implements OnInit {

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit() {
  }

  feedbackSubmit(form){
    var name = form.value.name;
    var email = form.value.email;
    var complaint = form.value.complaint;
    const data = {
      name,
      email,
      complaint
    }
    console.log(data);
    this.http.post('http://ec2-15-206-171-244.ap-south-1.compute.amazonaws.com:80/Email',data,{responseType: 'text'}).subscribe(
      rdata => {
        console.log(rdata);
        this.router.navigate(['/tabs']);
      }
    )
  }

}
