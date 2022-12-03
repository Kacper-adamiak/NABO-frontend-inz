import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ElevatedBoxHeaderComponent} from './elevated-box-header.component';

describe('ElevatedBoxHeaderComponent', () => {
  let component: ElevatedBoxHeaderComponent;
  let fixture: ComponentFixture<ElevatedBoxHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ElevatedBoxHeaderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ElevatedBoxHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
