import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LevelsPageComponent } from './levels-page.component';
import {AppModule} from "../../../app.module";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {AfterSigninModule} from "../after-signin.module";

describe('LevelsPageComponent', () => {
  let component: LevelsPageComponent;
  let fixture: ComponentFixture<LevelsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LevelsPageComponent ],
      imports: [
        AfterSigninModule,
        AppModule,
        HttpClientTestingModule
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LevelsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
