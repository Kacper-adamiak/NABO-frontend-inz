import {ComponentFixture, TestBed} from '@angular/core/testing';

import {PotentialCategoriesPanelComponent} from './potential-categories-panel.component';

describe('PotentialCategoriesComponent', () => {
  let component: PotentialCategoriesPanelComponent;
  let fixture: ComponentFixture<PotentialCategoriesPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PotentialCategoriesPanelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PotentialCategoriesPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
