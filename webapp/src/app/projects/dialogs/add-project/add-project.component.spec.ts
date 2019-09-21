import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {BrowserModule} from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {Router} from '@angular/router';

import {AddProjectComponent} from './add-project.component';
import {Project} from '../../project';
import {MaterialModule} from '../../../material/material.module';
import {ProjectService} from '../../project.service';

describe('AddProjectComponent', () => {
  let component: AddProjectComponent;
  let fixture: ComponentFixture<AddProjectComponent>;
  const mockRouter = {
    navigate: jasmine.createSpy('navigate')
  };
  const dialogMock = {
    close: () => { }
  };
  const project = new Project();
  project.id = 1234;
  project.name = 'Arlen the best';
  project.beginDate = new Date(Date.now() - 24 * 60 * 60 * 1000);
  project.endDate = new Date(Date.now() + 24 * 60 * 60 * 1000);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserModule,
        HttpClientModule,
        BrowserAnimationsModule,
        MaterialModule
      ],
      declarations: [
        AddProjectComponent
      ],
      providers: [
        ProjectService,
        {
          provide: Router,
          useValue: mockRouter
        },
        {
          provide: MatDialogRef,
          useValue: dialogMock
        },
        {
          provide: MAT_DIALOG_DATA,
          useValue: {data: project}
        }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('form invalid when empty', () => {
    expect(component.formControl.valid).toBeFalsy();
  });

  it('should getErrorMessage()', () => {
    const spy = spyOn(component.formControl, 'hasError');

    component.getErrorMessage();

    expect(spy).toHaveBeenCalled();
  });

  it('should onNoClick()', () => {
    const spy = spyOn(component.dialogRef, 'close').and.callThrough();

    component.onNoClick();

    expect(spy).toHaveBeenCalled();
  });

  afterEach(() => {
    TestBed.resetTestingModule();
  });
});
