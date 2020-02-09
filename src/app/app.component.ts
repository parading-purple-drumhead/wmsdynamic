import { Component, ViewChildren, QueryList, OnDestroy } from '@angular/core';
import { Platform,NavController, IonRouterOutlet, AlertController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Router } from '@angular/router';
import { Plugins } from '@capacitor/core';

// import { timer } from 'rxjs/observable/timer';
const { Toast } = Plugins;

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnDestroy {
  backButtonSubscription;
  @ViewChildren(IonRouterOutlet) routerOutlets: QueryList<IonRouterOutlet>;
  lastTimeBackPress = 0;
  timePeriodToExit = 2000;




  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    public alertController: AlertController,
    private statusBar: StatusBar,
    public router: Router,
  ) {
    this.initializeApp();
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.backButtonEvent();
      this.splashScreen.hide();
      
    });
  }

 

  backButtonEvent() {
    this.platform.backButton.subscribeWithPriority(0, () => {
      this.routerOutlets.forEach(async(outlet: IonRouterOutlet) => {
        if (this.router.url === '/register') {
          await this.router.navigate(['/login']);
        }
        else if(this.router.url==='/forgotpw')
        { await this.router.navigate(['/login']);

        }
        else if(this.router.url==='/otppage')
        { await this.router.navigate(['/login']);

        }
        
        else if (this.router.url === '/login') {
          if (new Date().getTime() - this.lastTimeBackPress >= this.timePeriodToExit) {
            this.lastTimeBackPress = new Date().getTime();
            this.presentAlertConfirm();
          }
          else {
            navigator['app'].exitApp();
          }
        }
        
        else if (this.router.url === '/tabs/tab1') {
          if (new Date().getTime() - this.lastTimeBackPress >= this.timePeriodToExit) {
            this.lastTimeBackPress = new Date().getTime();
            this.presentAlertConfirm();
          }
          else {
            navigator['app'].exitApp();
          }
        }
        else if (this.router.url === '/tabs/tab2') {
          if (new Date().getTime() - this.lastTimeBackPress >= this.timePeriodToExit) {
            this.lastTimeBackPress = new Date().getTime();
            this.presentAlertConfirm();
          }
          else {
            navigator['app'].exitApp();
          }
        }
        else if (this.router.url === '/tabs/tab3') {
          if (new Date().getTime() - this.lastTimeBackPress >= this.timePeriodToExit) {
            this.lastTimeBackPress = new Date().getTime();
            this.presentAlertConfirm();
          }
          else {
            navigator['app'].exitApp();
          }
        }
      });
    });
  }
  
  async presentAlertConfirm() {
    const alert = await this.alertController.create({
      // header: 'Confirm!',
      message: 'Are you sure you want to exit the app?',
      buttons: [{
        text: 'Cancel',
        role: 'cancel',
        cssClass: 'secondary',
        handler: (blah) => {}
      }, {
        text: 'Close App',
        handler: () => {
          navigator['app'].exitApp();
        }
      }]
    });
  
    await alert.present();
  }






  //Called when view is left
  ngOnDestroy() {
    // Unregister the custom back button action for this page
    this.backButtonSubscription.unsubscribe();
  }
}
