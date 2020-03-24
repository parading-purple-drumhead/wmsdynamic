import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router, Data } from '@angular/router';
import { NavController, PopoverController } from '@ionic/angular';
import { AppPopOverComponent } from 'src/app/app-pop-over/app-pop-over.component';
import { Storage } from '@ionic/storage';


@Component({
  selector: 'app-compform',
  templateUrl: './compform.page.html',
  styleUrls: ['./compform.page.scss'],
})
export class CompformPage implements OnInit {

  constructor(private http: HttpClient,private router: Router,public navCtrl: NavController, public activeRoute: ActivatedRoute,
    private popover: PopoverController,private storage: Storage) { }

  build: string = '';
  Floor: string = '';

  username: string = '';

  arrayData: Array<Data>
  buildNames: Array<Data>
  floorNames: Array<Data>

  ngOnInit(){
    var data = null;
    this.http.post('http://ec2-15-206-171-244.ap-south-1.compute.amazonaws.com:80/dropbuild', data, {responseType: 'text'}).subscribe(
    
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
    this.http.post('http://ec2-15-206-171-244.ap-south-1.compute.amazonaws.com:80/dropfloor', data, {responseType: 'text'}).subscribe(
    
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
    var Username:string;
    this.storage.get('user').then((val) => {
      console.log(val);
      Username = val;
      console.log(Username);
    var Building = form.value.Building;
    var Floor = form.value.Floor;
    var location = form.value.Location;
    var Complaint = form.value.Complaint;
    var Status = '0';
    const data = {
      Building,
      Floor,
      location,
      Complaint,
      Username,
      Status // This adds it to the payload
     }; 
     console.log(data);
    this.http.post('http://ec2-15-206-171-244.ap-south-1.compute.amazonaws.com:80/inscomplaint', data, {responseType: 'text'}).subscribe(
    
      rdata => {
        console.log(rdata);        
        }
      );
    this.router.navigateByUrl('/tabs/tab2');
  });
  }

  async openPopOver(event){
    const popover = await this.popover.create({
      component: AppPopOverComponent,
      event
    });
    return await popover.present();
  }
}
