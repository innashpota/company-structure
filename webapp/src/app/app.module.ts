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

@NgModule({
  declarations: [
    AppComponent,
    EmployeesComponent,
    PageNotFoundComponent,
    AddEmployeeComponent,
    EditEmployeeComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule
  ],
  providers: [
    EmployeeService
  ],
  entryComponents: [
    AddEmployeeComponent,
    EditEmployeeComponent
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule {
}
