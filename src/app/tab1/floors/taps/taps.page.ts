import { Component, OnInit } from '@angular/core';
import { Router, Data, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-taps',
  templateUrl: './taps.page.html',
  styleUrls: ['./taps.page.scss'],
})
export class TapsPage implements OnInit {

  arrayData: Array<Data>;
  data: any;
  temp: any;
  getBuilding: any;
  getFloor: any;

  constructor(private router: Router,public navCtrl: NavController, public activeRoute: ActivatedRoute,private http: HttpClient) { }

  ngOnInit() {
    this.getBuilding = this.activeRoute.snapshot.paramMap.get("building");
    console.log(this.getBuilding);
    var Building = this.getBuilding;
    this.getFloor = this.activeRoute.snapshot.paramMap.get("floor");
    console.log(this.getFloor);
    var Floor = this.getFloor;
    // console.log(this.data);
    // var Building = this.data;
    this.arrayData = new Array();
    var from = "2019-12-01 00:00:00";
    var to = "2019-12-01 05:00:42";
    // var from = new Date(date1.getTime() - date1.getTimezoneOffset()*60000).toISOString();
    // var to = new Date(date2.getTime() - date2.getTimezoneOffset()*60000).toISOString(); //This generates the new date
    // to = to.replace("T"," ");
    // to = to.substr(0, to.length - 5);
    // from = from.replace("T"," ");
    // from = from.substr(0, from.length - 13);
    // from = from.replace(" "," 00:00:00")
    console.log("From: " + from)
    console.log("To: " + to);
    const data = {
      from,
      to,
      Building,
      Floor // This adds it to the payload
     }; 
    this.http.post('http://ec2-13-233-95-111.ap-south-1.compute.amazonaws.com:5000/getDetails', data, {responseType: 'text'}).subscribe(
    
      rdata => {
        console.log(rdata);
        let temp = JSON.parse(rdata);
        this.arrayData = temp.Total;        
        }
      );
  }

}
