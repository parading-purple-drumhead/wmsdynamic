import { Component, OnInit } from '@angular/core';
import { AppPopOverComponent } from '../app-pop-over/app-pop-over.component';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-aboutus',
  templateUrl: './aboutus.page.html',
  styleUrls: ['./aboutus.page.scss'],
})
export class AboutusPage implements OnInit {

  constructor(private popover: PopoverController) { }

  ngOnInit() {
  }

  async openPopOver(event){
    const popover = await this.popover.create({
      component: AppPopOverComponent,
      event
    });
    return await popover.present();
  }
}
