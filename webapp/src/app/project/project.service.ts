import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError, map} from 'rxjs/operators';

import {Project} from './project';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  readonly headers = new HttpHeaders().set('Content-Type', 'application/json');

  public constructor(public http: HttpClient) { }

  add(project: Project): Observable<Project> {
    return this.http.post<Project>(
      `${environment.url}/projects`,
      project,
      {headers: this.headers})
      .pipe(catchError(this.handleError));
  }

  getAll(): Observable<Project[]> {
    return this.http.get<Project[]>(
      `${environment.url}/projects`,
      {headers: this.headers}
    )
      .pipe(
        map(data => data),
        catchError(this.handleError)
      );
  }

  addEmployee(projectId: number, employeeId: number): Observable<Project> {
    return this.http.post<Project>(
      `${environment.url}/projects/${projectId}/employees/${employeeId}`,
      {},
      {headers: this.headers})
      .pipe(catchError(this.handleError));
  }

  editEmployee(projectId: number, oldEmployeeId: number, newEmployeeId: number): Observable<Project> {
    return this.http.put<Project>(
      `${environment.url}/projects/${projectId}/employees`,
      {
        'oldEmployeeId': oldEmployeeId,
        'newEmployeeId': newEmployeeId
      },
      {headers: this.headers})
      .pipe(catchError(this.handleError));
  }

  deleteEmployee(projectId: number, employeeId: number): Observable<void> {
    return this.http.delete<void>(`${environment.url}/projects/${projectId}/employees/${employeeId}`)
      .pipe(catchError(this.handleError));
  }

  editProjectName(id: number, name: string): Observable<Project> {
    return this.http.put<Project>(
      `${environment.url}/projects/${id}`,
      {'name': name},
      {headers: this.headers})
      .pipe(catchError(this.handleError));
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${environment.url}/projects/${id}`)
      .pipe(catchError(this.handleError));
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
