import { Directive, Input, TemplateRef, ViewContainerRef, OnInit } from '@angular/core';

@Directive({
  selector: '[appHasRole]'
})
export class HasRoleDirective implements OnInit{
  
  @Input('appHasRole') roles: string[];

  constructor(private templateRef: TemplateRef<any>, private viewContainer: ViewContainerRef) { }

  ngOnInit(){}

}
