import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {BrowserModule} from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {Router} from '@angular/router';

import {AddProjectComponent} from './add-project.component';
import {Project} from '../../project';
import {MaterialModule} from '../../../material/material.module';
import {EditProjectTitleComponent} from '../edit-project-title/edit-project-title.component';
import {EditEmployeeInProjectComponent} from '../edit-employee-in-project/edit-employee-in-project.component';
import {DeleteProjectComponent} from '../delete-project/delete-project.component';
import {EmployeesComponent} from '../../../employees/employees.component';
import {ProjectComponent} from '../../project.component';
import {PageNotFoundComponent} from '../../../page-not-found/page-not-found.component';
import {AddEmployeeToProjectComponent} from '../add-employee-to-project/add-employee-to-project.component';
import {ProjectService} from '../../project.service';

describe('AddProjectComponent', () => {
  let component: AddProjectComponent;
  let fixture: ComponentFixture<AddProjectComponent>;
  const mockRouter = {
    navigate: jasmine.createSpy('navigate')
  };
  const project = new Project();
  project.id = 1234;
  project.name = 'Arlen the best';
  project.beginDate = new Date(Date.now() - 24 * 60 * 60 * 1000);
  project.endDate = new Date(Date.now() + 24 * 60 * 60 * 1000);

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
          useValue: {data: project}
        }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddProjectComponent);
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
