import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab2Page } from './tab2.page';
import { SharedDirectivesModule } from '../directives/shared-directives.module';
import { ComponentsModule } from '../components/components.module';


@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ComponentsModule,
    RouterModule.forChild([{ path: '', component: Tab2Page }]),
    SharedDirectivesModule
  ],
  entryComponents: [],
  declarations: [Tab2Page]
})
export class Tab2PageModule {}
