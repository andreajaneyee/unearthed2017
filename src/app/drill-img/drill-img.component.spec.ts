import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DrillImgComponent } from './drill-img.component';

describe('DrillImgComponent', () => {
  let component: DrillImgComponent;
  let fixture: ComponentFixture<DrillImgComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DrillImgComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DrillImgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
