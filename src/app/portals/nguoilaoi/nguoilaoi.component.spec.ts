import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NguoilaoiComponent } from './nguoilaoi.component';

describe('NguoilaoiComponent', () => {
  let component: NguoilaoiComponent;
  let fixture: ComponentFixture<NguoilaoiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NguoilaoiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NguoilaoiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
