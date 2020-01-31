import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HasRoleDirective } from './has-role.directive';
import { CompareValidatorDirective } from './compare-validator.directive';



@NgModule({
  declarations: [HasRoleDirective],
  imports: [
    CommonModule
  ],
  exports: [
    HasRoleDirective
  ]
})
export class SharedDirectivesModule { }
