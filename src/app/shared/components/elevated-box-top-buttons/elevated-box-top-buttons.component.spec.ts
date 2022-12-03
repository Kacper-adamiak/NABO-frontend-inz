import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ElevatedBoxTopButtonsComponent} from './elevated-box-top-buttons.component';

describe('ElevatedBoxTopButtonsComponent', () => {
  let component: ElevatedBoxTopButtonsComponent;
  let fixture: ComponentFixture<ElevatedBoxTopButtonsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ElevatedBoxTopButtonsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ElevatedBoxTopButtonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
