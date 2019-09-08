import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {AddEmployeeToProjectComponent} from './add-employee-to-project.component';

describe('AddEmployeeToProjectComponent', () => {
  let component: AddEmployeeToProjectComponent;
  let fixture: ComponentFixture<AddEmployeeToProjectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AddEmployeeToProjectComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEmployeeToProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
