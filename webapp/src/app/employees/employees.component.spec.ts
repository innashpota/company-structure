import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {BrowserModule} from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {of} from 'rxjs';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';

import {EmployeesComponent} from './employees.component';
import {MaterialModule} from '../material/material.module';
import {EmployeeService} from './employee.service';
import {AddEmployeeComponent} from './dialogs/add-employee/add-employee.component';
import {DeleteEmployeeComponent} from './dialogs/delete-employee/delete-employee.component';
import {EditEmployeeComponent} from './dialogs/edit-employee/edit-employee.component';
import {Employee} from './employee';

describe('EmployeesComponent', () => {
  let component: EmployeesComponent;
  let fixture: ComponentFixture<EmployeesComponent>;
  let dialog: MatDialog;
  const employee = new Employee();
  employee.id = 123;
  employee.firstName = 'Peggy';
  employee.lastName = 'Hill';
  employee.gender = 'F';
  employee.city = 'Texas';

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
        AddEmployeeComponent,
        DeleteEmployeeComponent,
        EditEmployeeComponent,
        EmployeesComponent
      ],
      providers: [
        EmployeeService,
        {
          provide: MatDialogRef,
          useValue: jasmine.createSpyObj('MatDialogRef', ['afterClosed'])
        }
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    dialog = TestBed.get(MatDialog);
    fixture = TestBed.createComponent(EmployeesComponent);
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

  it('should refreshTable()', async(() => {
    component.isLoadingResults = true;
    const employees = [employee];
    const spy = spyOn(component['service'], 'getAll').and.returnValue(of(employees));

    component.refreshTable();

    expect(spy).toHaveBeenCalled();
    expect(component.isLoadingResults).toEqual(false);
    expect(component.dataSource).toEqual(employees);
  }));

  describe('openAddDialog()', () => {
    it('should open dialog returned empty Employee', () => {
      const openDialogSpy = spyOn(dialog, 'open').and.returnValue({
        afterClosed: () => of(null)
      } as MatDialogRef<Employee>);

      component.openAddDialog();

      expect(openDialogSpy).toHaveBeenCalled();
    });

    it('should open dialog returned Employee', () => {
      spyOn(dialog, 'open').and.returnValue({
        afterClosed: () => of(employee)
      } as MatDialogRef<Employee>);
      const spy = spyOn(component['service'], 'add')
        .and.returnValue(of(employee));
      const spyPush = spyOn(component.dataSource, 'push');
      const spyRefreshTable = spyOn(component, 'refreshTable');

      component.openAddDialog();

      expect(spy).toHaveBeenCalled();
      expect(spyPush).toHaveBeenCalled();
      expect(spyRefreshTable).toHaveBeenCalled();
    });
  });

  describe('openEditDialog()', () => {
    it('should open dialog returned empty Employee', () => {
      const openDialogSpy = spyOn(dialog, 'open').and.returnValue({
        afterClosed: () => of(null)
      } as MatDialogRef<Employee>);

      component.openEditDialog(employee);

      expect(openDialogSpy).toHaveBeenCalled();
    });

    it('should open dialog returned Employee', () => {
      spyOn(dialog, 'open').and.returnValue({
        afterClosed: () => of(employee)
      } as MatDialogRef<Employee>);
      const spy = spyOn(component['service'], 'edit')
        .and.returnValue(of(employee));
      const spyPush = spyOn(component.dataSource, 'push');
      const spyRefreshTable = spyOn(component, 'refreshTable');

      component.openEditDialog(employee);

      expect(spy).toHaveBeenCalled();
      expect(spyPush).toHaveBeenCalled();
      expect(spyRefreshTable).toHaveBeenCalled();
    });
  });

  describe('deleteEmployee()', () => {
    it('should open dialog returned FALSE', () => {
      const openDialogSpy = spyOn(dialog, 'open').and.returnValue({
        afterClosed: () => of(false)
      } as MatDialogRef<boolean>);

      component.deleteEmployee(employee);

      expect(openDialogSpy).toHaveBeenCalled();
    });

    it('should open dialog returned TRUE', () => {
      spyOn(dialog, 'open').and.returnValue({
        afterClosed: () => of(true)
      } as MatDialogRef<boolean>);
      const spy = spyOn(component['service'], 'delete');

      component.deleteEmployee(employee);

      expect(spy).toHaveBeenCalled();
    });
  });

  afterEach(() => {
    TestBed.resetTestingModule();
  });
});
