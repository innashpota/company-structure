import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {BrowserModule} from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {Router} from '@angular/router';

import {EditEmployeeInProjectComponent} from './edit-employee-in-project.component';
import {MaterialModule} from '../../../material/material.module';
import {ProjectService} from '../../project.service';
import {EmployeeService} from '../../../employees/employee.service';

describe('EditEmployeeInProjectComponent', () => {
  let component: EditEmployeeInProjectComponent;
  let fixture: ComponentFixture<EditEmployeeInProjectComponent>;
  const mockRouter = {
    navigate: jasmine.createSpy('navigate')
  };
  const mockData = {
    projectName: 'Texas city',
    employeeId: 2
  };

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
          useValue: {}
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

  afterEach(() => {
    TestBed.resetTestingModule();
  });
});
