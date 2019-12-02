import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router, Data } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-compform',
  templateUrl: './compform.page.html',
  styleUrls: ['./compform.page.scss'],
})
export class CompformPage implements OnInit {

  constructor(private http: HttpClient,private router: Router,public navCtrl: NavController, public activeRoute: ActivatedRoute) { }

  arrayData: Array<Data>

  ngOnInit(){}

  urmum(){
    console.log("Clicked");
    this.arrayData = new Array();
    var Building = "Ur Mum";
    var Floor  = "Ur Mum";
    var location  = "Ur Mum";
    var Complaint  = "Ur Mum";
    const data = {
      Building,
      Floor,
      location,
      Complaint // This adds it to the payload
     }; 
    this.http.post('http://ec2-13-233-95-111.ap-south-1.compute.amazonaws.com:5000/inscomplaint', data);
  }

}
