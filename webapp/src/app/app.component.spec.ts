import {TestBed} from '@angular/core/testing';
import {RouterModule, Routes} from '@angular/router';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {BrowserModule} from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';

import {AppComponent} from './app.component';
import {MaterialModule} from './material/material.module';
import {EmployeesComponent} from './employees/employees.component';
import {ProjectComponent} from './projects/project.component';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import {AddEmployeeComponent} from './employees/dialogs/add-employee/add-employee.component';
import {EditEmployeeComponent} from './employees/dialogs/edit-employee/edit-employee.component';
import {AddProjectComponent} from './projects/dialogs/add-project/add-project.component';
import {EditProjectTitleComponent} from './projects/dialogs/edit-project-title/edit-project-title.component';
import {AddEmployeeToProjectComponent} from './projects/dialogs/add-employee-to-project/add-employee-to-project.component';
import {EditEmployeeInProjectComponent} from './projects/dialogs/edit-employee-in-project/edit-employee-in-project.component';
import {DeleteProjectComponent} from './projects/dialogs/delete-project/delete-project.component';
import {DeleteEmployeeComponent} from './employees/dialogs/delete-employee/delete-employee.component';
import {ProjectService} from './projects/project.service';

describe('AppComponent', () => {
  let component: AppComponent;

  const testRoutes: Routes = [
    {
      path: 'employees',
      component: EmployeesComponent
    },
    {
      path: 'projects',
      component: ProjectComponent
    },
    {
      path: '',
      redirectTo: '/employees',
      pathMatch: 'full'
    },
    {
      path: '**',
      component: PageNotFoundComponent
    }
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserModule,
        HttpClientModule,
        MaterialModule,
        RouterModule.forRoot(testRoutes),
        BrowserAnimationsModule
      ],
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
        EditEmployeeInProjectComponent,
        DeleteProjectComponent,
        DeleteEmployeeComponent
      ],
      providers: [
        ProjectService
      ]
    }).compileComponents();

    const fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it(`should have 'Company structure' as a title`, () => {
    const title = 'Company structure';

    expect(component.title).toEqual(title);
  });

  afterEach(() => {
    TestBed.resetTestingModule();
  });
});
