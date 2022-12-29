import {ComponentFixture, TestBed} from '@angular/core/testing';

import {EditAnotherUserDialogComponent} from './edit-another-user-dialog.component';

describe('EditAnotherUserDialogComponent', () => {
  let component: EditAnotherUserDialogComponent;
  let fixture: ComponentFixture<EditAnotherUserDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditAnotherUserDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditAnotherUserDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
