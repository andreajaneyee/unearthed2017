import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DataTestingComponent } from './data-testing.component';

describe('DataTestingComponent', () => {
  let component: DataTestingComponent;
  let fixture: ComponentFixture<DataTestingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DataTestingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DataTestingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
