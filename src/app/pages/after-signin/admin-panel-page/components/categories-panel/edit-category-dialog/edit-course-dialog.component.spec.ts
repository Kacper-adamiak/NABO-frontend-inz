import {ComponentFixture, TestBed} from '@angular/core/testing';

import {EditCategoryDialogComponent} from './edit-course-dialog.component';

describe('EditCourseDialogComponent', () => {
  let component: EditCategoryDialogComponent;
  let fixture: ComponentFixture<EditCategoryDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditCategoryDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditCategoryDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
