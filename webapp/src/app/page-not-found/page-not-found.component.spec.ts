import {ComponentFixture, TestBed} from '@angular/core/testing';
import {BrowserModule} from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {PageNotFoundComponent} from './page-not-found.component';
import {MaterialModule} from '../material/material.module';
import {AddEmployeeToProjectComponent} from '../projects/dialogs/add-employee-to-project/add-employee-to-project.component';
import {AddProjectComponent} from '../projects/dialogs/add-project/add-project.component';
import {DeleteProjectComponent} from '../projects/dialogs/delete-project/delete-project.component';
import {EditEmployeeInProjectComponent} from '../projects/dialogs/edit-employee-in-project/edit-employee-in-project.component';
import {EditProjectTitleComponent} from '../projects/dialogs/edit-project-title/edit-project-title.component';
import {EmployeesComponent} from '../employees/employees.component';
import {ProjectComponent} from '../projects/project.component';
import {ProjectService} from '../projects/project.service';

describe('PageNotFoundComponent', () => {
  let component: PageNotFoundComponent;
  let fixture: ComponentFixture<PageNotFoundComponent>;

  beforeEach(() => {
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
        ProjectService
      ]
    })
      .compileComponents();
    fixture = TestBed.createComponent(PageNotFoundComponent);
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
