import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestQuestionsPageComponent } from './test-questions-page.component';

describe('TestQuestionsPageComponent', () => {
  let component: TestQuestionsPageComponent;
  let fixture: ComponentFixture<TestQuestionsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TestQuestionsPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestQuestionsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
