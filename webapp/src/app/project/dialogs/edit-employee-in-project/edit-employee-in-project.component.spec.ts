import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {EditEmployeeInProjectComponent} from './edit-employee-in-project.component';

describe('EditEmployeeInProjectComponent', () => {
  let component: EditEmployeeInProjectComponent;
  let fixture: ComponentFixture<EditEmployeeInProjectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EditEmployeeInProjectComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditEmployeeInProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
