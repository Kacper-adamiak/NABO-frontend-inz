import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseGeneralPageComponent } from './course-general-page.component';

describe('CourseGeneralPageComponent', () => {
  let component: CourseGeneralPageComponent;
  let fixture: ComponentFixture<CourseGeneralPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CourseGeneralPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseGeneralPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
