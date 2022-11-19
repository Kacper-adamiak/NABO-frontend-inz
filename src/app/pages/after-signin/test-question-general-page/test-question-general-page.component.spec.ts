import {ComponentFixture, TestBed} from '@angular/core/testing';

import {TestQuestionGeneralPageComponent} from './test-question-general-page.component';

describe('TestQuestionGeneralPageComponent', () => {
  let component: TestQuestionGeneralPageComponent;
  let fixture: ComponentFixture<TestQuestionGeneralPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TestQuestionGeneralPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestQuestionGeneralPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
