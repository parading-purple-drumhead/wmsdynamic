import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { Tab1Page } from './tab1/tab1.page';
import { FloorsPage } from './tab1/floors/floors.page';
import { IonicStorageModule } from '@ionic/storage';
import { AppPopOverComponent } from './app-pop-over/app-pop-over.component';
import { CompareValidatorDirective } from './directives/compare-validator.directive';
import { FCM } from '@ionic-native/fcm/ngx';


@NgModule({
  declarations: [AppComponent,CompareValidatorDirective],
  entryComponents: [],
  imports: [BrowserModule,
    FormsModule,
    IonicModule.forRoot(), 
    AppRoutingModule,
    HttpModule,
     HttpClientModule,
     ReactiveFormsModule,
     IonicStorageModule.forRoot()],
  providers: [
    FCM,
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    HttpClientModule,
  ],
  bootstrap: [AppComponent]

})
export class AppModule {}
