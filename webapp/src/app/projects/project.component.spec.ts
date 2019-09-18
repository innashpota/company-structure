import {ComponentFixture, TestBed} from '@angular/core/testing';
import {BrowserModule} from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {ProjectComponent} from './project.component';
import {MaterialModule} from '../material/material.module';
import {AddEmployeeToProjectComponent} from './dialogs/add-employee-to-project/add-employee-to-project.component';
import {AddProjectComponent} from './dialogs/add-project/add-project.component';
import {DeleteProjectComponent} from './dialogs/delete-project/delete-project.component';
import {EditEmployeeInProjectComponent} from './dialogs/edit-employee-in-project/edit-employee-in-project.component';
import {EditProjectTitleComponent} from './dialogs/edit-project-title/edit-project-title.component';
import {ProjectService} from './project.service';

describe('ProjectComponent', () => {
  let component: ProjectComponent;
  let fixture: ComponentFixture<ProjectComponent>;

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
        ProjectComponent
      ],
      providers: [
        ProjectService
      ]
    })
      .compileComponents();
    fixture = TestBed.createComponent(ProjectComponent);
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
