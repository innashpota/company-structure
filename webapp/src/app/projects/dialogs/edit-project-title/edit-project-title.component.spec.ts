import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {BrowserModule} from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {Router} from '@angular/router';

import {EditProjectTitleComponent} from './edit-project-title.component';
import {MaterialModule} from '../../../material/material.module';
import {EditEmployeeInProjectComponent} from '../edit-employee-in-project/edit-employee-in-project.component';
import {DeleteProjectComponent} from '../delete-project/delete-project.component';
import {EmployeesComponent} from '../../../employees/employees.component';
import {ProjectComponent} from '../../project.component';
import {PageNotFoundComponent} from '../../../page-not-found/page-not-found.component';
import {AddProjectComponent} from '../add-project/add-project.component';
import {AddEmployeeToProjectComponent} from '../add-employee-to-project/add-employee-to-project.component';
import {ProjectService} from '../../project.service';

describe('EditProjectTitleComponent', () => {
  let component: EditProjectTitleComponent;
  let fixture: ComponentFixture<EditProjectTitleComponent>;
  const mockRouter = {
    navigate: jasmine.createSpy('navigate')
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
          useValue: {data: 'Project name'}
        }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditProjectTitleComponent);
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
