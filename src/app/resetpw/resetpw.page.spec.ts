import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResetpwPage } from './resetpw.page';

describe('ResetpwPage', () => {
  let component: ResetpwPage;
  let fixture: ComponentFixture<ResetpwPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResetpwPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResetpwPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
