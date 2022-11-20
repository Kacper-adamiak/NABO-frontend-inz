import {ComponentFixture, TestBed} from '@angular/core/testing';

import {AddNewCategoryPanelComponent} from './add-new-category-panel.component';

describe('AddNewCategoryComponent', () => {
  let component: AddNewCategoryPanelComponent;
  let fixture: ComponentFixture<AddNewCategoryPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddNewCategoryPanelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddNewCategoryPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
