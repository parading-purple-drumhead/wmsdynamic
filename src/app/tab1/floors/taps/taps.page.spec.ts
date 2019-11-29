import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TapsPage } from './taps.page';

describe('TapsPage', () => {
  let component: TapsPage;
  let fixture: ComponentFixture<TapsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TapsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TapsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
