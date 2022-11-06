import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewLevelDialogComponent } from './new-level-dialog.component';

describe('NewLevelDialogComponent', () => {
  let component: NewLevelDialogComponent;
  let fixture: ComponentFixture<NewLevelDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewLevelDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewLevelDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
