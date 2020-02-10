import { Component, OnInit } from '@angular/core';
import { Router, Data, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { NavController, PopoverController, LoadingController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { AppPopOverComponent } from '../app-pop-over/app-pop-over.component';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit{


  arrayData: Array<Data>;
  user: any;
  AccessToken: any;

  constructor(private http: HttpClient,private router: Router,public navCtrl: NavController, public activeRoute: ActivatedRoute,
    private storage: Storage,private popover: PopoverController,private loading: LoadingController) {};
    
  ngOnInit(){
    this.displayBuildings();
  }

  displayBuildings(){
    this.arrayData = new Array();
    // let date1 = new Date();
    // let date2 = new Date();
    // var from = new Date(date1.getTime() - date1.getTimezoneOffset()*60000).toISOString();
    // var to = new Date(date2.getTime() - date2.getTimezoneOffset()*60000).toISOString(); //This generates the new date
    // to = to.replace("T"," ");
    // to = to.substr(0, to.length - 5);
    // from = from.replace("T"," ");
    // from = from.substr(0, from.length - 13);
    // from = from.replace(" "," 00:00:00")
    // console.log("From: " + from)
    // console.log("To: " + to);
    // const from = "2020-01-10 00:00:00";
    // const to = "2020-01-10 14:11:38"
    const data = {
       // This adds it to the payload
     }; 
    this.http.post('http://ec2-13-233-247-42.ap-south-1.compute.amazonaws.com:5000/buildpage', data, {responseType: 'text'}).subscribe(
    
      rdata => {
        console.log(rdata);
        let temp = JSON.parse(rdata);
        this.arrayData = temp.Total;        
        }
      );
  }

  openFloors(x){
    this.router.navigate(['/floors',{building:x}]);
  }

  doRefresh(event) {
    console.log('Begin async operation');
    setTimeout(() => {
      console.log('Async operation has ended');
      this.ngOnInit();
      event.target.complete();
    }, 500);
  }

  async openPopOver(event){
    const popover = await this.popover.create({
      component: AppPopOverComponent,
      event
    });
    return await popover.present();
  }
}