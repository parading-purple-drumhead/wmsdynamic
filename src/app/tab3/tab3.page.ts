import { Component } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { AppPopOverComponent } from '../app-pop-over/app-pop-over.component';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  constructor(private popover: PopoverController) {}

  async openPopOver(event){
    const popover = await this.popover.create({
      component: AppPopOverComponent,
      event
    });
    return await popover.present();
  }
}
