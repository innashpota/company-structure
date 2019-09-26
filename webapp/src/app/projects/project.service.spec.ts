import {TestBed} from '@angular/core/testing';
import {BrowserModule} from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {ProjectService} from './project.service';
import {MaterialModule} from '../material/material.module';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {environment} from '../../environments/environment';
import {Project} from './project';

describe('ProjectService', () => {
  let httpMock: HttpTestingController;
  let service: ProjectService;
  const project = new Project();
  project.id = 234;
  project.name = 'Project name';

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
        ProjectService
      ]
    });

    httpMock = TestBed.get(HttpTestingController);
    service = TestBed.get(ProjectService);
  });

  it('should be created', () => {
    const service: ProjectService = TestBed.get(ProjectService);
    expect(service).toBeTruthy();
  });

  it('should add() and call POST method', () => {
    service.add(project).subscribe(data =>
      expect(data).toEqual(project)
    );

    const request = httpMock.expectOne(`${environment.url}/projects`);

    expect(request.request.method).toEqual('POST');
    expect(request.request.headers).toEqual(service.headers);
    request.flush(project);
    httpMock.verify();
  });

  it('should getAll() and call GET method', () => {
    service.getAll().subscribe(projects =>
      expect(projects).toEqual([project])
    );

    const request = httpMock.expectOne(`${environment.url}/projects`);

    expect(request.request.method).toEqual('GET');
    expect(request.request.headers).toEqual(service.headers);
    request.flush([project]);
    httpMock.verify();
  });

  it('should addEmployee() and call POST method', () => {
    service.addEmployee(234, 4).subscribe(data =>
      expect(data).toEqual(project)
    );

    const request = httpMock.expectOne(`${environment.url}/projects/234/employees/4`);

    expect(request.request.method).toEqual('POST');
    expect(request.request.headers).toEqual(service.headers);
    request.flush(project);
    httpMock.verify();
  });

  it('should editEmployee() and call PUT method', () => {
    service.editEmployee(234, 4, 6).subscribe(data =>
      expect(data).toEqual(project)
    );

    const request = httpMock.expectOne(`${environment.url}/projects/234/employees`);

    expect(request.request.method).toEqual('PUT');
    request.flush(project);
    httpMock.verify();
  });

  it('should edit() and call DELETE method', () => {
    service.deleteEmployee(234, 4).subscribe(() =>
      expect(null).toEqual(null)
    );

    const request = httpMock.expectOne(`${environment.url}/projects/234/employees/4`);

    expect(request.request.method).toEqual('DELETE');
    request.flush({});
    httpMock.verify();
  });

  it('should editProjectName() and call PUT method', () => {
    const proj = new Project();
    proj.id = project.id;
    proj.name = 'New title';
    service.editProjectName(234, 'New title').subscribe(data =>
      expect(data).toEqual(proj)
    );

    const request = httpMock.expectOne(`${environment.url}/projects/234`);

    expect(request.request.method).toEqual('PUT');
    request.flush(proj);
    httpMock.verify();
  });

  it('should delete() and call DELETE method', () => {
    service.delete(234).subscribe(() =>
      expect(null).toEqual(null)
    );

    const request = httpMock.expectOne(`${environment.url}/projects/234`);

    expect(request.request.method).toEqual('DELETE');
    request.flush({});
    httpMock.verify();
  });

  afterEach(() => {
    TestBed.resetTestingModule();
  });
});
