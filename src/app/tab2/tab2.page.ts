import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router, Data } from '@angular/router';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit{

  constructor(private http: HttpClient,private router: Router,public navCtrl: NavController, public activeRoute: ActivatedRoute) {}

  arrayData: Array<Data>

  ngOnInit(){
    this.arrayData = new Array();
    var Building;
    var Floor;
    var location;
    var Complaint;
    const data = {
      Building,
      Floor,
      location,
      Complaint // This adds it to the payload
     }; 
    this.http.post('http://ec2-13-232-233-111.ap-south-1.compute.amazonaws.com:5000/complaint', data, {responseType: 'text'}).subscribe(
    
      rdata => {
        console.log(rdata);
        let temp = JSON.parse(rdata);
        this.arrayData = temp.Complaints;        
        }
      );
  }

  del(a,b,c,d){
    var Building = a;
    var Floor = b;
    var location = c;
    var Complaint = d;
    const comp = {
      Building,
      Floor,
      location,
      Complaint // This adds it to the payload
     }; 
    this.http.post('http://ec2-13-232-233-111.ap-south-1.compute.amazonaws.com:5000/delcomplaint', comp);
    this.ngOnInit();
  }
}