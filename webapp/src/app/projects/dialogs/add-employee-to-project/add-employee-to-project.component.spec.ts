import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {BrowserModule} from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {Router} from '@angular/router';

import {AddEmployeeToProjectComponent} from './add-employee-to-project.component';
import {MaterialModule} from '../../../material/material.module';
import {ProjectService} from '../../project.service';

describe('AddEmployeeToProjectComponent', () => {
  let component: AddEmployeeToProjectComponent;
  let fixture: ComponentFixture<AddEmployeeToProjectComponent>;
  const mockRouter = {
    navigate: jasmine.createSpy('navigate')
  };
  const dialogMock = {
    close: () => { }
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserModule,
        HttpClientModule,
        BrowserAnimationsModule,
        MaterialModule
      ],
      declarations: [
        AddEmployeeToProjectComponent
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
          useValue: {data: 'Project name'}
        }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEmployeeToProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('form invalid when empty', () => {
    expect(component.formControl.valid).toBeFalsy();
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
