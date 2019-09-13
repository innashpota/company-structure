import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {BrowserModule} from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {Router} from '@angular/router';

import {EditEmployeeInProjectComponent} from './edit-employee-in-project.component';
import {MaterialModule} from '../../../material/material.module';
import {EmployeesComponent} from '../../../employees/employees.component';
import {ProjectComponent} from '../../project.component';
import {PageNotFoundComponent} from '../../../page-not-found/page-not-found.component';
import {DeleteProjectComponent} from '../delete-project/delete-project.component';
import {EditProjectTitleComponent} from '../edit-project-title/edit-project-title.component';
import {AddProjectComponent} from '../add-project/add-project.component';
import {AddEmployeeToProjectComponent} from '../add-employee-to-project/add-employee-to-project.component';
import {ProjectService} from '../../project.service';

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
        AddEmployeeToProjectComponent,
        AddProjectComponent,
        DeleteProjectComponent,
        EditEmployeeInProjectComponent,
        EditProjectTitleComponent,
        EmployeesComponent,
        ProjectComponent,
        PageNotFoundComponent
      ],
      providers: [
        ProjectService,
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
