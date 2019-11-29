import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FloorsPage } from './floors.page';

describe('FloorsPage', () => {
  let component: FloorsPage;
  let fixture: ComponentFixture<FloorsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FloorsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FloorsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
