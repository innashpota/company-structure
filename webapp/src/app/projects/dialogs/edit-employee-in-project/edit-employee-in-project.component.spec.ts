import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {BrowserModule} from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {Router} from '@angular/router';
import {of} from 'rxjs';

import {EditEmployeeInProjectComponent} from './edit-employee-in-project.component';
import {MaterialModule} from '../../../material/material.module';
import {ProjectService} from '../../project.service';
import {EmployeeService} from '../../../employees/employee.service';
import {Employee} from '../../../employees/employee';

describe('EditEmployeeInProjectComponent', () => {
  let component: EditEmployeeInProjectComponent;
  let fixture: ComponentFixture<EditEmployeeInProjectComponent>;
  const mockRouter = {
    navigate: jasmine.createSpy('navigate')
  };
  const dialogMock = {
    close: () => { }
  };
  const mockData = {
    projectName: 'Texas city',
    employeeId: 2
  };
  const employee = new Employee();
  employee.id = 123;
  employee.firstName = 'Peggy';
  employee.lastName = 'Hill';
  employee.gender = 'F';
  employee.city = 'Texas';

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserModule,
        HttpClientModule,
        BrowserAnimationsModule,
        MaterialModule
      ],
      declarations: [
        EditEmployeeInProjectComponent
      ],
      providers: [
        ProjectService,
        EmployeeService,
        {
          provide: Router,
          useValue: mockRouter
        },
        {
          provide: MatDialogRef,
          useValue: dialogMock
        },
        {
          provide: MAT_DIALOG_DATA,
          useValue: {data: mockData}
        }
      ]
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

  it('should ngOnInit()', () => {
    const employees = [employee];
    const spy = spyOn(component['employeeService'], 'getAll')
      .and.returnValue(of(employees));

    component.ngOnInit();

    expect(spy).toHaveBeenCalled();
    expect(component.employees).toEqual(employees);
  });

  it('should ngOnDestroy()', () => {
    const spy = spyOn(component['subscription'], 'unsubscribe');

    component.ngOnDestroy();

    expect(spy).toHaveBeenCalled();
  });

  it('should onNoClick()', () => {
    const spy = spyOn(component.dialogRef, 'close').and.callThrough();

    component.onNoClick();

    expect(spy).toHaveBeenCalled();
  });

  afterEach(() => {
    TestBed.resetTestingModule();
  });
});
