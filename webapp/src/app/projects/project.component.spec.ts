import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {BrowserModule} from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {of, Subscription} from 'rxjs';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {HttpClientTestingModule} from '@angular/common/http/testing';

import {ProjectComponent} from './project.component';
import {MaterialModule} from '../material/material.module';
import {AddEmployeeToProjectComponent} from './dialogs/add-employee-to-project/add-employee-to-project.component';
import {AddProjectComponent} from './dialogs/add-project/add-project.component';
import {DeleteProjectComponent} from './dialogs/delete-project/delete-project.component';
import {EditEmployeeInProjectComponent} from './dialogs/edit-employee-in-project/edit-employee-in-project.component';
import {EditProjectTitleComponent} from './dialogs/edit-project-title/edit-project-title.component';
import {ProjectService} from './project.service';
import {Project} from './project';
import {Employee} from '../employees/employee';

describe('ProjectComponent', () => {
  let component: ProjectComponent;
  let fixture: ComponentFixture<ProjectComponent>;
  let dialog: MatDialog;
  const employee = new Employee();
  employee.id = 123;
  employee.firstName = 'Peggy';
  employee.lastName = 'Hill';
  employee.gender = 'F';
  employee.city = 'Texas';
  const project: Project = new Project();
  project.id = 123;
  project.name = 'Arlen the Best';
  project.beginDate = new Date(Date.now() - 24 * 60 * 60 * 1000);
  project.endDate = new Date(Date.now() + 24 * 60 * 60 * 1000);
  project.employees = [employee];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserModule,
        HttpClientModule,
        HttpClientTestingModule,
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
        ProjectService,
        {
          provide: MatDialogRef,
          useValue: jasmine.createSpyObj('MatDialogRef', ['afterClosed'])
        }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    dialog = TestBed.get(MatDialog);
    fixture = TestBed.createComponent(ProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should ngOnInit()', () => {
    const spy = spyOn(component, 'refreshTable');

    component.ngOnInit();

    expect(spy).toHaveBeenCalled();
  });

  it('should ngOnDestroy()', () => {
    component['subscription'] = new Subscription();
    const spy = spyOn(component['subscription'], 'unsubscribe');

    component.ngOnDestroy();

    expect(spy).toHaveBeenCalled();
  });

  it('should refreshTable()', async(() => {
    component.isLoadingResults = true;
    const projects = [project];
    const spy = spyOn(component['service'], 'getAll').and.returnValue(of(projects));

    component.refreshTable();

    expect(spy).toHaveBeenCalled();
    expect(component.isLoadingResults).toEqual(false);
    expect(component.dataSource).toEqual(projects);
  }));

  it('should getEmployeesCount()', async(() => {
    const expectedEmployeesCount = 1;

    const employeesCount = component.getEmployeesCount(project);

    expect(employeesCount).toEqual(expectedEmployeesCount);
  }));

  it('should isEmptyEmployees()', async(() => {
    const expectedResult = true;

    const result = component.isEmptyEmployees(project);

    expect(result).toEqual(expectedResult);
  }));

  describe('openAddProjectDialog()', () => {
    it('should open dialog returned empty Project', () => {
      const openDialogSpy = spyOn(dialog, 'open').and.returnValue({
        afterClosed: () => of(null)
      } as MatDialogRef<Project>);

      component.openAddProjectDialog();

      expect(openDialogSpy).toHaveBeenCalled();
    });

    it('should open dialog returned Project', () => {
      spyOn(dialog, 'open').and.returnValue({
        afterClosed: () => of(project)
      } as MatDialogRef<Project>);
      const spy = spyOn(component['service'], 'add')
        .and.returnValue(of(project));
      const spyPush = spyOn(component.dataSource, 'push');
      const spyRefreshTable = spyOn(component, 'refreshTable');

      component.openAddProjectDialog();

      expect(spy).toHaveBeenCalled();
      expect(spyPush).toHaveBeenCalled();
      expect(spyRefreshTable).toHaveBeenCalled();
    });
  });

  describe('openEditTitleDialog()', () => {
    it('should open dialog returned empty Title', () => {
      const openDialogSpy = spyOn(dialog, 'open').and.returnValue({
        afterClosed: () => of(null)
      } as MatDialogRef<string>);

      component.openEditTitleDialog(123, 'New project title');

      expect(openDialogSpy).toHaveBeenCalled();
    });

    it('should open dialog returned Title', () => {
      spyOn(dialog, 'open').and.returnValue({
        afterClosed: () => of('New project title')
      } as MatDialogRef<string>);
      const spy = spyOn(component['service'], 'editProjectName')
        .and.returnValue(of(project));
      const spyPush = spyOn(component.dataSource, 'push');
      const spyRefreshTable = spyOn(component, 'refreshTable');

      component.openEditTitleDialog(123, 'New title');

      expect(spy).toHaveBeenCalled();
      expect(spyPush).toHaveBeenCalled();
      expect(spyRefreshTable).toHaveBeenCalled();
    });
  });

  describe('deleteProject()', () => {
    it('should open dialog returned FALSE', () => {
      const openDialogSpy = spyOn(dialog, 'open').and.returnValue({
        afterClosed: () => of(false)
      } as MatDialogRef<boolean>);

      component.deleteProject(123, 'Arlen the Best');

      expect(openDialogSpy).toHaveBeenCalled();
    });

    it('should open dialog returned TRUE', () => {
      spyOn(dialog, 'open').and.returnValue({
        afterClosed: () => of(true)
      } as MatDialogRef<boolean>);
      const spy = spyOn(component['service'], 'delete');

      component.deleteProject(123, 'Arlen the Best');

      expect(spy).toHaveBeenCalled();
    });
  });

  describe('openAddEmployeeDialog()', () => {
    it('should open dialog returned empty Employee', () => {
      const openDialogSpy = spyOn(dialog, 'open').and.returnValue({
        afterClosed: () => of(null)
      } as MatDialogRef<Employee>);

      component.openAddEmployeeDialog(project);

      expect(openDialogSpy).toHaveBeenCalled();
    });

    it('should open dialog returned Employee', () => {
      spyOn(dialog, 'open').and.returnValue({
        afterClosed: () => of(employee)
      } as MatDialogRef<Employee>);
      const spy = spyOn(component['service'], 'addEmployee')
        .and.returnValue(of(project));
      const spyPush = spyOn(component.dataSource, 'push');
      const spyRefreshTable = spyOn(component, 'refreshTable');

      component.openAddEmployeeDialog(project);

      expect(spy).toHaveBeenCalled();
      expect(spyPush).toHaveBeenCalled();
      expect(spyRefreshTable).toHaveBeenCalled();
    });
  });

  describe('openChangeEmployeeDialog()', () => {
    it('should open dialog returned empty Employee id', () => {
      const openDialogSpy = spyOn(dialog, 'open').and.returnValue({
        afterClosed: () => of(null)
      } as MatDialogRef<number>);

      component.openChangeEmployeeDialog(project, employee);

      expect(openDialogSpy).toHaveBeenCalled();
    });

    it('should open dialog returned Employee id', () => {
      spyOn(dialog, 'open').and.returnValue({
        afterClosed: () => of(24)
      } as MatDialogRef<number>);
      const spy = spyOn(component['service'], 'editEmployee')
        .and.returnValue(of(project));
      const spyPush = spyOn(component.dataSource, 'push');
      const spyRefreshTable = spyOn(component, 'refreshTable');

      component.openChangeEmployeeDialog(project, employee);

      expect(spy).toHaveBeenCalled();
      expect(spyPush).toHaveBeenCalled();
      expect(spyRefreshTable).toHaveBeenCalled();
    });
  });

  it('should deleteEmployee()', () => {
    const spy = spyOn(component['service'], 'deleteEmployee').and.callThrough();

    component.deleteEmployee(123, 24);

    expect(spy).toHaveBeenCalled();
  });

  afterEach(() => {
    TestBed.resetTestingModule();
  });
});
