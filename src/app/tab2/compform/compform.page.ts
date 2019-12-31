import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router, Data } from '@angular/router';
import { NavController } from '@ionic/angular';


@Component({
  selector: 'app-compform',
  templateUrl: './compform.page.html',
  styleUrls: ['./compform.page.scss'],
})
export class CompformPage implements OnInit {

  constructor(private http: HttpClient,private router: Router,public navCtrl: NavController, public activeRoute: ActivatedRoute) { }

  build: string = '';
  Floor: string = '';


  arrayData: Array<Data>
  buildNames: Array<Data>
  floorNames: Array<Data>

  ngOnInit(){
    var data = null;
    this.http.post('http://ec2-13-233-95-111.ap-south-1.compute.amazonaws.com:5000/dropbuild', data, {responseType: 'text'}).subscribe(
    
      rdata => {
        console.log(rdata);
        let temp = JSON.parse(rdata);
        this.buildNames = temp.Building;        
        }
      );
  }

  selectFloor(val: any){
    this.build = val;
    console.log(this.build);
    var Building = this.build;
    const data = {
      Building,
    };
    this.http.post('http://ec2-13-233-95-111.ap-south-1.compute.amazonaws.com:5000/dropfloor', data, {responseType: 'text'}).subscribe(
    
      rdata => {
        console.log(rdata);
        let temp = JSON.parse(rdata);
        this.floorNames = temp.Floor;        
        }
      );
  }

  selectLocation(val: any){
    this.Floor = val;
    console.log(this.Floor);
  }

  addcomp(form)
  {
    var Building = form.value.Building;
    var Floor = form.value.Floor;
    var location = form.value.Location;
    var Complaint = form.value.Complaint;
    console.log(Building,Floor,location,Complaint)
    const data = {
      Building,
      Floor,
      location,
      Complaint // This adds it to the payload
     }; 
    this.http.post('http://ec2-13-233-95-111.ap-south-1.compute.amazonaws.com:5000/inscomplaint', data, {responseType: 'text'}).subscribe(
    
      rdata => {
        console.log(rdata);        
        }
      );
    this.router.navigateByUrl('/tabs/tab2');
  }


}
