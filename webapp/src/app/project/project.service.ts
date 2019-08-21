import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {environment} from '../../environments/environment';
import {catchError, map} from 'rxjs/operators';
import {Project} from './project';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  readonly headers = new HttpHeaders().set('Content-Type', 'application/json');

  public constructor(public http: HttpClient) {
  }

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

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(`Backend returned code ${error.status}, body was: ${error.error}`);
    }
    return throwError('Something bad happened; please try again later.');
  }
}
