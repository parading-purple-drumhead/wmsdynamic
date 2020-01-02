import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, Data } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Chart } from 'chart.js';

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
  from: string;
  to: string;
  manfrom: Date;
  manto: Date;



  constructor(private activeRoute: ActivatedRoute, private router: Router,private http: HttpClient){
  }

  ngOnInit() {
    this.getValue = this.activeRoute.snapshot.paramMap.get("building");
    console.log(this.getValue);
    var Building = this.getValue;
    this.arrayData = new Array();
    this.test1 = new Array();
    this.test2 = new Array();
    let date1 = new Date();
    let date2 = new Date();
    this.from = new Date(date1.getTime() - date1.getTimezoneOffset()*60000).toISOString();
    this.to = new Date(date2.getTime() - date2.getTimezoneOffset()*60000).toISOString(); //This generates the new date
    this.to = this.to.replace("T"," ");
    this.to = this.to.substr(0, this.to.length - 5);
    this.from = this.from.replace("T"," ");
    this.from = this.from.substr(0, this.from.length - 13);
    this.from = this.from.replace(" "," 00:00:00")
    console.log("From: " + this.from)
    console.log("To: " + this.to);
    var to = this.to;
    var from = this.from;
    const data = {
      from,
      to,
      Building // This adds it to the payload
     }; 
    this.http.post('http://ec2-13-235-242-60.ap-south-1.compute.amazonaws.com:5000/secpage', data, {responseType: 'text'}).subscribe(
    
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
    this.getValue = this.activeRoute.snapshot.paramMap.get("building");
    var Building = this.getValue;
    this.arrayData = new Array();
    this.test1 = new Array();
    this.test2 = new Array();
    console.log("From: " + manfrom)
    console.log("To: " + manto);
    var to = manto;
    var from = manfrom;
    const data = {
      from,
      to,
      Building // This adds it to the payload
     }; 
    this.http.post('http://ec2-13-235-242-60.ap-south-1.compute.amazonaws.com:5000/secpage', data, {responseType: 'text'}).subscribe(
    
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
}
