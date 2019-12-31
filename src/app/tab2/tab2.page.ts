import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router, Data } from '@angular/router';
import { NavController,AlertController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit{

  constructor(private http: HttpClient,private router: Router,public navCtrl: NavController, public activeRoute: ActivatedRoute,
    private authService: AuthService, private storage: Storage, private alert: AlertController) {}

  arrayData: Array<Data>
  buildNames: Array<Data>
  delArray: Array<String>
  username: string;

  ngOnInit(){
    this.storage.get('user').then((val) => {
      this.username = val;
      console.log('Your type is', this.username);
    });
    this.buildinglist();
    this.displayComplaints();
  }

  displayComplaints(){
    console.log("Function called");
    this.arrayData = new Array();
    const data = { }; 
    this.http.post('http://ec2-13-233-95-111.ap-south-1.compute.amazonaws.com:5000/complaint', data, {responseType: 'text'}).subscribe(
      rdata => {
        console.log(rdata);
        let temp = JSON.parse(rdata);
        this.arrayData = temp.Complaints;        
        }
      );
  }

  buildSelect(val: any){
    console.log(val);
    var Building = val;
    this.arrayData = new Array();
    var Building;
    const data = {
      Building,// This adds it to the payload
     }; 
    this.http.post('http://ec2-13-233-95-111.ap-south-1.compute.amazonaws.com:5000/filter', data, {responseType: 'text'}).subscribe(
    
      rdata => {
        console.log(rdata);
        let temp = JSON.parse(rdata);
        this.arrayData = temp.filter;        
        }
      );

  }

  buildinglist(){
    this.buildNames = new Array();
    const data = {
      // This adds it to the payload
     }; 
    this.http.post('http://ec2-13-233-95-111.ap-south-1.compute.amazonaws.com:5000/building', data, {responseType: 'text'}).subscribe(
    
      rdata => {
        console.log(rdata);
        let temp = JSON.parse(rdata);
        this.buildNames = temp.Building;        
        }
      );
  }

  del(a,b,c,d){
    this.delArray = new Array();
    var Building = a;
    var Floor = b;
    var location = c;
    var Complaint = d;
    const username = this.username;
    console.log(a,b,c,d,username);
    const comp = {
      Building,
      Floor,
      location,
      Complaint,
      username // This adds it to the payload
     }; 
    this.http.post('http://ec2-13-233-95-111.ap-south-1.compute.amazonaws.com:5000/delcomplaint', comp, {responseType: 'text'}).subscribe(
    
      rdata => {
        console.log(rdata);
        let temp = JSON.parse(rdata);
        this.delArray = temp.Complaints;
        if(this.delArray[0] === '0'){
          this.errorAlert();
        }
        else if (this.delArray[0] === '1'){
          this.displayComplaints();          
        }     
      }
    );
  }

  addcomp(){
    this.router.navigate(['/compform']);
  }

  logout(){
    this.authService.logout();
    this.navCtrl.navigateRoot('/login');
  }

  async errorAlert() {
      const alert = await this.alert.create({
        header: 'Access Denied',
        message: 'Sorry, you do not have access to delete complaints',
        buttons: ['OK']
      });
  
      await alert.present();
  }
}