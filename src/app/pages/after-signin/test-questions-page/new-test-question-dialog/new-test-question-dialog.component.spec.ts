import {ComponentFixture, TestBed} from '@angular/core/testing';

import {NewTestQuestionDialogComponent} from './new-test-question-dialog.component';

describe('NewTestQuestionDialogComponent', () => {
  let component: NewTestQuestionDialogComponent;
  let fixture: ComponentFixture<NewTestQuestionDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewTestQuestionDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewTestQuestionDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
