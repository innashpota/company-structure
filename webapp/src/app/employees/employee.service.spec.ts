import {TestBed} from '@angular/core/testing';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {HttpClientModule} from '@angular/common/http';

import {EmployeeService} from './employee.service';
import {MaterialModule} from '../material/material.module';
import {Employee} from './employee';
import {environment} from '../../environments/environment';

describe('EmployeeService', () => {
  let httpMock: HttpTestingController;
  let service: EmployeeService;
  const firstEmployee = new Employee();
  firstEmployee.id = 123;
  firstEmployee.firstName = 'Peggy';
  firstEmployee.lastName = 'Hill';
  firstEmployee.gender = 'F';
  firstEmployee.city = 'Texas';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserModule,
        HttpClientModule,
        HttpClientTestingModule,
        MaterialModule,
        BrowserAnimationsModule
      ],
      providers: [
        EmployeeService
      ]
    });

    httpMock = TestBed.get(HttpTestingController);
    service = TestBed.get(EmployeeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add() and call POST method', () => {
    service.add(firstEmployee).subscribe(employee =>
      expect(employee).toEqual(firstEmployee)
    );

    const request = httpMock.expectOne(`${environment.url}/employees`);

    expect(request.request.method).toEqual('POST');
    expect(request.request.headers).toEqual(service.headers);
    request.flush(firstEmployee);
    httpMock.verify();
  });

  it('should edit() and call PUT method', () => {
    service.edit(firstEmployee).subscribe(employee =>
      expect(employee).toEqual(firstEmployee)
    );

    const request = httpMock.expectOne(`${environment.url}/employees/123`);

    expect(request.request.method).toEqual('PUT');
    expect(request.request.headers).toEqual(service.headers);
    request.flush(firstEmployee);
    httpMock.verify();
  });

  it('should delete() and call DELETE method', () => {
    service.delete(123).subscribe(() =>
      expect(null).toEqual(null)
    );

    const request = httpMock.expectOne(`${environment.url}/employees/123`);

    expect(request.request.method).toEqual('DELETE');
    request.flush({});
    httpMock.verify();
  });

  it('should getAll() and call GET method', () => {
    service.getAll().subscribe(employees =>
      expect(employees).toEqual([firstEmployee])
    );

    const request = httpMock.expectOne(`${environment.url}/employees`);

    expect(request.request.method).toEqual('GET');
    expect(request.request.headers).toEqual(service.headers);
    request.flush([firstEmployee]);
    httpMock.verify();
  });

  afterEach(() => {
    httpMock.verify();
  });
});
