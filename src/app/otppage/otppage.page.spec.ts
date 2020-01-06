import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OtppagePage } from './otppage.page';

describe('OtppagePage', () => {
  let component: OtppagePage;
  let fixture: ComponentFixture<OtppagePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OtppagePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OtppagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
