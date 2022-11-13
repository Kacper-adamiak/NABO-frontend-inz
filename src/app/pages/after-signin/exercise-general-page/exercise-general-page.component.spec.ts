import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ExerciseGeneralPageComponent} from './exercise-general-page.component';

describe('ExerciseGeneralPageComponent', () => {
  let component: ExerciseGeneralPageComponent;
  let fixture: ComponentFixture<ExerciseGeneralPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExerciseGeneralPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExerciseGeneralPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
