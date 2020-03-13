import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, Data } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Chart } from 'chart.js';
import { PopoverController } from '@ionic/angular';
import { AppPopOverComponent } from 'src/app/app-pop-over/app-pop-over.component';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-floors',
  templateUrl: './floors.page.html',
  styleUrls: ['./floors.page.scss'],
})
export class FloorsPage implements OnInit {

  @ViewChild('barChart',null) barChart;

  bars: any;
  colorArray: any;

  arrayData: Array<Data>;
  data: any;
  temp: any;
  getValue: any;
  test1: Array<Data>;
  test2: Array<Data>;
  manfrom: Date;
  manto: Date;
  Building: any;

  constructor(private activeRoute: ActivatedRoute, private router: Router,private http: HttpClient,private popover: PopoverController,
    private storage: Storage){
  }

  ngOnInit() {
    var from = '',to = '';
    this.getValue = this.activeRoute.snapshot.paramMap.get("building");
    console.log(this.getValue);
    this.storage.set('buildingFloors', this.getValue);
    this.storage.get('buildingFloors').then((building) => {
      this.Building = building;
      this.displayFloors(this.Building,from,to);
    });
  }

  displayFloors(Building,from,to){
    this.arrayData = new Array();
    this.test1 = new Array();
    this.test2 = new Array();
    const data = {
      from,
      to,
      Building // This adds it to the payload
     };
     console.log(data); 
    this.http.post('http://ec2-15-206-171-244.ap-south-1.compute.amazonaws.com:80/secpage', data, {responseType: 'text'}).subscribe(
    
      rdata => {
        console.log(rdata);
        let temp = JSON.parse(rdata);
        this.arrayData = temp.Total;
        var length = temp.Total.length;
        console.log(length);
        for (var i=0; i<length; i++){
        this.test1.push(temp.Total[i].Floor);
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
            },
            scaleLabel: {
              display: true,
              labelString: 'Consumption'
            }
          }],
          xAxes: [{
            scaleLabel: {
              display: true,
              labelString: 'Floors'
            }
          }]
        }
      }
    });
  }  

  toggle(){
    var from = new Date(this.manfrom).toISOString();
    from = from.replace("T"," ");
    from = from.substr(0, from.length-5);
    console.log("From:",from);
    var to = new Date(this.manto).toISOString();
    to = to.replace("T"," ");
    to = to.substr(0, to.length-5);
    console.log("To:",to);
    this.displayFloors(this.Building,from,to);
  }

  openTaps(x,y){
    this.router.navigate(["/taps",{building: x, floor: y}]);
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
