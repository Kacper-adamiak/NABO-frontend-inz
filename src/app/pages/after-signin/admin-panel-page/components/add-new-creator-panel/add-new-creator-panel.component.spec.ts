import {ComponentFixture, TestBed} from '@angular/core/testing';

import {AddNewCreatorPanelComponent} from './add-new-creator-panel.component';

describe('AddNewCreatorPanelComponent', () => {
  let component: AddNewCreatorPanelComponent;
  let fixture: ComponentFixture<AddNewCreatorPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddNewCreatorPanelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddNewCreatorPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
