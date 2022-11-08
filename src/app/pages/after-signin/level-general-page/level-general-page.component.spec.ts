import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LevelGeneralPageComponent } from './level-general-page.component';

describe('LevelGeneralPageComponent', () => {
  let component: LevelGeneralPageComponent;
  let fixture: ComponentFixture<LevelGeneralPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LevelGeneralPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LevelGeneralPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
