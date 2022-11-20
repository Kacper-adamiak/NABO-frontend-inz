import {ComponentFixture, TestBed} from '@angular/core/testing';

import {NewPotentialCategoryDialogComponent} from './new-potential-category-dialog.component';

describe('NewPotentialCategoryDialogComponent', () => {
  let component: NewPotentialCategoryDialogComponent;
  let fixture: ComponentFixture<NewPotentialCategoryDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewPotentialCategoryDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewPotentialCategoryDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
