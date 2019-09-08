import {Injectable} from '@angular/core';
import {Observable, throwError} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';

import {Employee} from './employee';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  readonly headers = new HttpHeaders().set('Content-Type', 'application/json');

  public constructor(public http: HttpClient) { }

  add(employee: Employee): Observable<Employee> {
    return this.http.post<Employee>(
      `${environment.url}/employees`,
      employee,
      {headers: this.headers})
      .pipe(catchError(this.handleError));
  }

  edit(employee: Employee): Observable<Employee> {
    return this.http.put<Employee>(
      `${environment.url}/employees/${employee.id}`,
      employee,
      {headers: this.headers})
      .pipe(catchError(this.handleError));
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${environment.url}/employees/${id}`)
      .pipe(catchError(this.handleError));
  }

  getAll(): Observable<Employee[]> {
    return this.http.get<Employee[]>(
      `${environment.url}/employees`,
      {headers: this.headers}
    )
      .pipe(
        map(data => data),
        catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(`Backend returned code ${error.status}, body was: ${error.error}`);
    }
    return throwError('Something bad happened; please try again later.');
  }
}
