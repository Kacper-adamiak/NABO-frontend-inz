import {ComponentFixture, TestBed} from '@angular/core/testing';

import {DataDifferenceDialogComponent} from './data-difference-dialog.component';

describe('DataDifferenceDialogComponent', () => {
  let component: DataDifferenceDialogComponent;
  let fixture: ComponentFixture<DataDifferenceDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DataDifferenceDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DataDifferenceDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
