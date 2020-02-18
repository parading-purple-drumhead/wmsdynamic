import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, Data, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { NavController, PopoverController } from '@ionic/angular';
import { Chart } from 'chart.js';
import { AppPopOverComponent } from 'src/app/app-pop-over/app-pop-over.component';
import { Storage } from '@ionic/storage'

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
  Building: any;
  Floor: any;

  constructor(private router: Router,public navCtrl: NavController, public activeRoute: ActivatedRoute,private http: HttpClient,
    private popover: PopoverController, private storage: Storage) { }

  ngOnInit() {
    var from = '';
    var to = '';
    this.getBuilding = this.activeRoute.snapshot.paramMap.get("building");
    console.log(this.getBuilding);
    this.storage.set('buildingTaps', this.getBuilding);
    this.storage.get('buildingTaps').then((building) => {
      this.Building = building;
    });
    this.getFloor = this.activeRoute.snapshot.paramMap.get("floor");
    console.log(this.getFloor);
    this.storage.set('floorTaps',this.getFloor);
    this.storage.get('floorTaps').then((floor) => {
      this.Floor = floor;
      this.displayTaps(this.Building,this.Floor,from,to);
    });
  }

  displayTaps(Building,Floor,from,to){
    this.arrayData = new Array();
    this.test1 = new Array();
    this.test2 = new Array();
    const data = {
      Building,
      Floor,
      from,
      to // This adds it to the payload
     };
     console.log(data);
    this.http.post('http://ec2-3-6-36-255.ap-south-1.compute.amazonaws.com:5000/getDetails', data, {responseType: 'text'}).subscribe(
    
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
            },
            scaleLabel: {
              display: true,
              labelString: 'Consumption'
            }
          }],
          xAxes: [{
            scaleLabel: {
              display: true,
              labelString: 'Taps'
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
    this.displayTaps(this.Building,this.Floor,from,to);
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
