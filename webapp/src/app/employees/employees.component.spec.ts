import {ComponentFixture, TestBed} from '@angular/core/testing';
import {BrowserModule} from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {EmployeesComponent} from './employees.component';
import {MaterialModule} from '../material/material.module';
import {ProjectComponent} from '../projects/project.component';
import {PageNotFoundComponent} from '../page-not-found/page-not-found.component';
import {EmployeeService} from './employee.service';
import {AddEmployeeComponent} from './dialogs/add-employee/add-employee.component';
import {DeleteEmployeeComponent} from './dialogs/delete-employee/delete-employee.component';
import {EditEmployeeComponent} from './dialogs/edit-employee/edit-employee.component';

describe('EmployeesComponent', () => {
  let component: EmployeesComponent;
  let fixture: ComponentFixture<EmployeesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserModule,
        HttpClientModule,
        BrowserAnimationsModule,
        MaterialModule
      ],
      declarations: [
        AddEmployeeComponent,
        DeleteEmployeeComponent,
        EditEmployeeComponent,
        EmployeesComponent
      ],
      providers: [
        EmployeeService
      ]
    })
      .compileComponents();
    fixture = TestBed.createComponent(EmployeesComponent);
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
