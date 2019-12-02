import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompformPage } from './compform.page';

describe('CompformPage', () => {
  let component: CompformPage;
  let fixture: ComponentFixture<CompformPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompformPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompformPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
