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
    const data = {
       // This adds it to the payload
     }; 
    this.http.post('http://ec2-15-206-171-244.ap-south-1.compute.amazonaws.com:80/buildpage', data, {responseType: 'text'}).subscribe(
    
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