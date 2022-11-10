import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewFlashcardDialogComponent } from './new-flashcard-dialog.component';

describe('NewFlashcardDialogComponent', () => {
  let component: NewFlashcardDialogComponent;
  let fixture: ComponentFixture<NewFlashcardDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewFlashcardDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewFlashcardDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
