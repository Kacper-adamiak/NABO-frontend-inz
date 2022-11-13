import {ComponentFixture, TestBed} from '@angular/core/testing';

import {StatDetailPageComponent} from './stat-detail-page.component';

describe('StatDetailPageComponent', () => {
  let component: StatDetailPageComponent;
  let fixture: ComponentFixture<StatDetailPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StatDetailPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StatDetailPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
