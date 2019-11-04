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
import {ProjectService} from './projects/project.service';
import {EmployeeService} from './employees/employee.service';

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
        ProjectComponent
      ],
      providers: [
        ProjectService,
        EmployeeService
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
