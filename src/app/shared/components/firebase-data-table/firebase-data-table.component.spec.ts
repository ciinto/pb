import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FirebaseDataTableComponent } from './firebase-data-table.component';

describe('FirebaseDataTableComponent', () => {
  let component: FirebaseDataTableComponent;
  let fixture: ComponentFixture<FirebaseDataTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FirebaseDataTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FirebaseDataTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
