import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, Data } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Chart } from 'chart.js';
import { viewClassName } from '@angular/compiler';


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


  constructor(private activeRoute: ActivatedRoute, private router: Router,private http: HttpClient){
  }

  ngOnInit() {
    this.getValue = this.activeRoute.snapshot.paramMap.get("building");
    console.log(this.getValue);
    var Building = this.getValue;
    // console.log(this.data);
    // var Building = this.data;
    this.arrayData = new Array();
    this.test1 = new Array();
    this.test2 = new Array();
    var from = "2019-11-04 10:37:34";
    var to = "2019-11-04 10:39:29";
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
      Building // This adds it to the payload
     }; 
    this.http.post('http://ec2-13-232-233-111.ap-south-1.compute.amazonaws.com:5000/secpage', data, {responseType: 'text'}).subscribe(
    
      rdata => {
        console.log(rdata);
        let temp = JSON.parse(rdata);
        this.arrayData = temp.Total;
        // this.test1 = this.arrayData;
        // console.log(this.test1);
        }
      );
  }

  ionViewDidEnter(){this.createBarChart()};

  createBarChart() {
    this.bars = new Chart(this.barChart.nativeElement, {
      type: 'bar',
      data: {
        labels: [],
        datasets: [{
          label: 'Viewers in millions',
          data: [],
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

  openTaps(x,y){
    this.router.navigate(["/taps",{building: x, floor: y}]);
  }

}
