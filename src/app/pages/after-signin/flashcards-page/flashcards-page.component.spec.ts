import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlashcardsPageComponent } from './flashcards-page.component';

describe('FlashcardsPageComponent', () => {
  let component: FlashcardsPageComponent;
  let fixture: ComponentFixture<FlashcardsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FlashcardsPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FlashcardsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
