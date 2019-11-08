import {fakeAsync, TestBed, tick} from '@angular/core/testing';
import {Router, Routes} from '@angular/router';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {BrowserModule} from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import {Location} from '@angular/common';
import {RouterTestingModule} from '@angular/router/testing';

import {AppComponent} from './app.component';
import {MaterialModule} from './material/material.module';
import {EmployeesComponent} from './employees/employees.component';
import {ProjectComponent} from './projects/project.component';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import {ProjectService} from './projects/project.service';
import {EmployeeService} from './employees/employee.service';

describe('AppComponent', () => {
  let component: AppComponent;
  let location: Location;
  let router: Router;

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
        RouterTestingModule.withRoutes(testRoutes),
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

    router = TestBed.get(Router);
    location = TestBed.get(Location);

    const fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    router.initialNavigation();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it(`should have 'Company structure' as a title`, () => {
    const title = 'Company structure';

    expect(component.title).toEqual(title);
  });

  it('navigate to "" redirects you to /employees', fakeAsync(() => {
    router.navigate(['']);
    tick();
    expect(location.path()).toBe('/employees');
  }));

  it('navigate to "/employees"', fakeAsync(() => {
    router.navigate(['/employees']);
    tick();
    expect(location.path()).toBe('/employees');
  }));

  it('navigate to "/projects"', fakeAsync(() => {
    router.navigate(['/projects']);
    tick();
    expect(location.path()).toBe('/projects');
  }));

  it('should setup the media query', () => {
    expect(component.mobileQuery).toBeTruthy();
    expect(component.mobileQueryListener).toBeDefined();
  });

  afterEach(() => {
    TestBed.resetTestingModule();
  });
});
