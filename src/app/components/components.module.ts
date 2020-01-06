import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AppPopOverComponent } from '../app-pop-over/app-pop-over.component';

@NgModule({
  declarations: [AppPopOverComponent],
  exports: [AppPopOverComponent],
  entryComponents: [AppPopOverComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})

export class ComponentsModule { }
