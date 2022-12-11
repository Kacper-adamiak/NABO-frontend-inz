import {ComponentFixture, TestBed} from '@angular/core/testing';

import {DelateAccountDialogComponent} from './delate-account-dialog.component';

describe('DelateAccountDialogComponent', () => {
  let component: DelateAccountDialogComponent;
  let fixture: ComponentFixture<DelateAccountDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DelateAccountDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DelateAccountDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
