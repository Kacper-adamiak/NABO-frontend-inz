import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlashcardGeneralPageComponent } from './flashcard-general-page.component';

describe('FlashcardGeneralPageComponent', () => {
  let component: FlashcardGeneralPageComponent;
  let fixture: ComponentFixture<FlashcardGeneralPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FlashcardGeneralPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FlashcardGeneralPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
