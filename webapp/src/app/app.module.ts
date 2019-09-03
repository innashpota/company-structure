import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {MaterialModule} from './material/material.module';
import {EmployeeService} from './employees/employee.service';
import {EmployeesComponent} from './employees/employees.component';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import {AddEmployeeComponent} from './employees/dialogs/add-employee/add-employee.component';
import {EditEmployeeComponent} from './employees/dialogs/edit-employee/edit-employee.component';
import {ProjectComponent} from './project/project.component';
import {ProjectService} from './project/project.service';
import {AddProjectComponent} from './project/dialogs/add-project/add-project.component';
import {EditProjectTitleComponent} from './project/dialogs/edit-project-title/edit-project-title.component';
import {AddEmployeeToProjectComponent} from './project/dialogs/add-employee-to-project/add-employee-to-project.component';
import {EditEmployeeInProjectComponent} from './project/dialogs/edit-employee-in-project/edit-employee-in-project.component';

@NgModule({
  declarations: [
    AppComponent,
    EmployeesComponent,
    PageNotFoundComponent,
    AddEmployeeComponent,
    EditEmployeeComponent,
    ProjectComponent,
    AddProjectComponent,
    EditProjectTitleComponent,
    AddEmployeeToProjectComponent,
    EditEmployeeInProjectComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule
  ],
  providers: [
    EmployeeService,
    ProjectService
  ],
  entryComponents: [
    AddEmployeeComponent,
    EditEmployeeComponent,
    AddProjectComponent,
    EditProjectTitleComponent,
    AddEmployeeToProjectComponent,
    EditEmployeeInProjectComponent
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule {
}
