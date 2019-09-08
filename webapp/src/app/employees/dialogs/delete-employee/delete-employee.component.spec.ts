import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {DeleteEmployeeComponent} from './delete-employee.component';

describe('DeleteEmployeeComponent', () => {
  let component: DeleteEmployeeComponent;
  let fixture: ComponentFixture<DeleteEmployeeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DeleteEmployeeComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteEmployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
