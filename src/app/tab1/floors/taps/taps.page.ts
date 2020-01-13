import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, Data, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { NavController, PopoverController } from '@ionic/angular';
import { Chart } from 'chart.js';
import { AppPopOverComponent } from 'src/app/app-pop-over/app-pop-over.component';

@Component({
  selector: 'app-taps',
  templateUrl: './taps.page.html',
  styleUrls: ['./taps.page.scss'],
})
export class TapsPage implements OnInit {

  @ViewChild('barChart',null) barChart;

  bars: any;
  colorArray: any;

  arrayData: Array<Data>;
  data: any;
  temp: any;
  getBuilding: any;
  getFloor: any;
  getValue: any;
  test1: Array<Data>;
  test2: Array<Data>;
  manfrom: Date;
  manto: Date;

  constructor(private router: Router,public navCtrl: NavController, public activeRoute: ActivatedRoute,private http: HttpClient,
    private popover: PopoverController) { }

  ngOnInit() {
    this.getBuilding = this.activeRoute.snapshot.paramMap.get("building");
    console.log(this.getBuilding);
    var Building = this.getBuilding;
    this.getFloor = this.activeRoute.snapshot.paramMap.get("floor");
    console.log(this.getFloor);
    var Floor = this.getFloor;
    let date1 = new Date();
    let date2 = new Date();
    var from = new Date(date1.getTime() - date1.getTimezoneOffset()*60000).toISOString();
    var to = new Date(date2.getTime() - date2.getTimezoneOffset()*60000).toISOString(); //This generates the new date
    to = to.replace("T"," ");
    to = to.substr(0, to.length - 5);
    from = from.replace("T"," ");
    from = from.substr(0, from.length - 13);
    from = from.replace(" "," 00:00:00")
    this.displayTaps(from,to,Building,Floor);
  }

  displayTaps(from,to,Building,Floor){
    this.arrayData = new Array();
    this.test1 = new Array();
    this.test2 = new Array();
    console.log("From: " + from)
    console.log("To: " + to);
    var to = to;
    var from = from;
    var Building = Building;
    var Floor = Floor;
    const data = {
      from,
      to,
      Building,
      Floor // This adds it to the payload
     }; 
    this.http.post('http://ec2-13-235-242-60.ap-south-1.compute.amazonaws.com:5000/getDetails', data, {responseType: 'text'}).subscribe(
    
      rdata => {
        console.log(rdata);
        let temp = JSON.parse(rdata);
        this.arrayData = temp.Total;
        var length = temp.Total.length;
        console.log(length);
        for (var i=0; i<length; i++){
        this.test1.push(temp.Total[i].tap_id);
        this.test2.push(temp.Total[i].total);
        }
        console.log(this.test1);
        console.log(this.test2);
        this.createBarChart();        
        }
      );
  }

  createBarChart() {
    this.bars = new Chart(this.barChart.nativeElement, {
      type: 'bar',
      data: {
        labels: this.test1,
        datasets: [{
          label: 'Consumption in Litres',
          data: this.test2,
          backgroundColor: 'rgb(38, 194, 129)', // array should have same number of elements as number of dataset
          borderColor: 'rgb(38, 194, 129)',// array should have same number of elements as number of dataset
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    });
  }

  toggle(){
    var manfrom: string;
    var manto: string;
    manfrom = new Date(this.manfrom).toISOString();
    manto = new Date(this.manto).toISOString();
    manfrom = manfrom.replace("T"," ");
    manfrom = manfrom.substr(0, manfrom.length - 5);
    manto = manto.replace("T"," ");
    manto = manto.substr(0, manto.length - 5);
    var Building = this.getValue;
    var Floor = this.getFloor;
    var to = manto;
    var from = manfrom;
    this.displayTaps(from,to,Building,Floor);
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
