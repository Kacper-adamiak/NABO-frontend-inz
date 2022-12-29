import {ComponentFixture, TestBed} from '@angular/core/testing';

import {DeleteAnotherUserDialogComponent} from './delete-another-user-dialog.component';

describe('DeleteAnotherUserDialogComponent', () => {
  let component: DeleteAnotherUserDialogComponent;
  let fixture: ComponentFixture<DeleteAnotherUserDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteAnotherUserDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteAnotherUserDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
