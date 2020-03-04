import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { AboutusPage } from './aboutus.page';
import { ComponentsModule } from '../components/components.module';
import { SharedDirectivesModule } from '../directives/shared-directives.module';

const routes: Routes = [
  {
    path: '',
    component: AboutusPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    RouterModule.forChild(routes),
    SharedDirectivesModule,
  ],
  declarations: [AboutusPage]
})
export class AboutusPageModule {}
