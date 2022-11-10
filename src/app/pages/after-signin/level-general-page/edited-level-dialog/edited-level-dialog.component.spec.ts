import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditedLevelDialogComponent } from './edited-level-dialog.component';

describe('EditedLevelDialogComponent', () => {
  let component: EditedLevelDialogComponent;
  let fixture: ComponentFixture<EditedLevelDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditedLevelDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditedLevelDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
