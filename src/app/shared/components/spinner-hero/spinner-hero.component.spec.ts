import {ComponentFixture, TestBed} from '@angular/core/testing';

import {SpinnerHeroComponent} from './spinner-hero.component';

describe('SpinnerHeroComponent', () => {
  let component: SpinnerHeroComponent;
  let fixture: ComponentFixture<SpinnerHeroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpinnerHeroComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpinnerHeroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
