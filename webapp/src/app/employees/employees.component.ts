import {Subscription} from 'rxjs';
import {MatDialog} from '@angular/material';
import {HttpClient} from '@angular/common/http';
import {Component, OnDestroy, OnInit} from '@angular/core';

import {Employee} from './employee';
import {EmployeeService} from './employee.service';
import {AddEmployeeComponent} from './dialogs/add-employee/add-employee.component';
import {EditEmployeeComponent} from './dialogs/edit-employee/edit-employee.component';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit, OnDestroy {
  dataSource: Employee[] = [];
  isLoadingResults = true;
  displayedColumns: string[] = ['firstName', 'lastName', 'gender', 'birthday', 'city', 'action'];
  private subscription: Subscription = null;


  constructor(
    private http: HttpClient,
    public dialog: MatDialog,
    private service: EmployeeService
  ) {
  }

  ngOnInit(): void {
    this.refreshTable();
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  refreshTable(): void {
    this.subscription = this.service.getAll().subscribe(data => {
      this.isLoadingResults = false;
      this.dataSource = data;
    });
  }

  openAddDialog(): void {
    const employee = new Employee();
    const dialogRef = this.dialog.open(AddEmployeeComponent, {
      data: employee
    });
    dialogRef.afterClosed().subscribe(
      outEmployee => {
        if (outEmployee) {
          this.service.add(employee).subscribe(
            empl => {
              this.dataSource.push(empl);
              this.refreshTable();
            });
        }
      });
  }

  openEditDialog(employee: Employee): void {
    const currentEmployee = new Employee();
    currentEmployee.id = employee.id;
    currentEmployee.firstName = employee.firstName;
    currentEmployee.lastName = employee.lastName;
    currentEmployee.gender = employee.gender;
    currentEmployee.birthday = employee.birthday;
    currentEmployee.city = employee.city;
    const dialogRef = this.dialog.open(EditEmployeeComponent, {
      data: currentEmployee
    });
    dialogRef.afterClosed().subscribe(
      outEmployee => {
        if (outEmployee) {
          this.service.edit(outEmployee).subscribe(
            empl => {
              this.dataSource.push(empl);
              this.refreshTable();
            });
        }
      });
  }

  deleteRow(employee: Employee): void {
    this.service.delete(employee.id).subscribe(
      () => this.refreshTable()
    );
  }
}
