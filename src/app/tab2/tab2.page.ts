import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router, Data } from '@angular/router';
import { NavController, AlertController, PopoverController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';
import { Storage } from '@ionic/storage';
import { AppPopOverComponent } from '../app-pop-over/app-pop-over.component';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {

  constructor(private http: HttpClient, private router: Router, public navCtrl: NavController, public activeRoute: ActivatedRoute,
    private authService: AuthService, private storage: Storage, private alert: AlertController, private popover: PopoverController) {
    this.building = "All"
  }

  arrayData: Array<Data>
  buildNames: Array<Data>
  delArray: Array<String>
  username: string;
  building: any;
  showuser: any;
  empty: any;

  ngOnInit() {
    this.storage.get('user').then((val) => {
      console.log(val)
      this.username = val;
      console.log('Username:', this.username);
      this.showDelete(this.username);
    });
    this.buildinglist();
    this.displayComplaints();
    this.empty = 1;
  }

  showDelete(username) {
    console.log(username);
    const data = {
      username
    }
    this.http.post('http://ec2-13-233-247-42.ap-south-1.compute.amazonaws.com:5000/showDelete', data, { responseType: 'text' }).subscribe(
      rdata => {
        console.log(rdata);
        let temp = JSON.parse(rdata);
        console.log(temp.Show)
        if (temp.Show === 1) {
          this.showuser = true;
        }
        else {
          this.showuser = false;
        }
      }
    )
  }

  displayComplaints() {
    this.arrayData = new Array();
    const data = {
      //Empty payload
    };
    this.http.post('http://ec2-13-233-247-42.ap-south-1.compute.amazonaws.com:5000/complaint', data, { responseType: 'text' }).subscribe(
      rdata => {
        console.log(rdata);
        let temp = JSON.parse(rdata);
        if(temp.Complaints.Complaints === ''){
          this.empty = 1;
        }
        else if (temp.Complaints.Complaints !== ''){
          this.empty = 0;
          this.arrayData = temp.Complaints;
        }
      }
    );
  }

  buildSelect(val: any) {
    console.log(val);
    this.building = val;
    var Building = this.building;
    if (Building === "All") {
      this.displayComplaints();
    }
    else {
      this.arrayData = new Array();
      var Building;
      const data = {
        Building,// This adds it to the payload
      };
      this.http.post('http://ec2-13-233-247-42.ap-south-1.compute.amazonaws.com:5000/filter', data, { responseType: 'text' }).subscribe(

        rdata => {
          console.log(rdata);
          let temp = JSON.parse(rdata);
          this.arrayData = temp.filter;
        }
      );
    }
  }

  buildinglist() {
    this.buildNames = new Array();
    const data = {
      // Empty payload
    };
    this.http.post('http://ec2-13-233-247-42.ap-south-1.compute.amazonaws.com:5000/dropbuild', data, { responseType: 'text' }).subscribe(

      rdata => {
        console.log(rdata);
        let temp = JSON.parse(rdata);
        this.buildNames = temp.Building;
      }
    );
  }

  del(a, b, c, d) {
    this.delArray = new Array();
    var Building = a;
    var Floor = b;
    var location = c;
    var Complaint = d;
    const username = this.username;
    console.log(a, b, c, d, username);
    const comp = {
      Building,
      Floor,
      location,
      Complaint,
      username // This adds it to the payload
    };
    this.http.post('http://ec2-13-233-247-42.ap-south-1.compute.amazonaws.com:5000/delcomplaint', comp, { responseType: 'text' }).subscribe(

      rdata => {
        console.log(rdata);
        let temp = JSON.parse(rdata);
        this.delArray = temp.Complaints;
        if (this.delArray[0] === '0') {
          this.errorAlert();
        }
        else if (this.delArray[0] === '1') {
          this.displayComplaints();
        }
      }
    );
  }

  addcomp() {
    this.router.navigate(['/compform']);
  }

  logout() {
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

  doRefresh(event) {
    console.log('Begin async operation');
    setTimeout(() => {
      console.log('Async operation has ended');
      this.buildSelect(this.building);
      event.target.complete();
    }, 500);
  }

  async openPopOver(event) {
    const popover = await this.popover.create({
      component: AppPopOverComponent,
      event
    });
    return await popover.present();
  }
}