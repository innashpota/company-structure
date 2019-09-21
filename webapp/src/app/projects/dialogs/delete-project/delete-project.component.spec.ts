import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {BrowserModule} from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {Router} from '@angular/router';

import {DeleteProjectComponent} from './delete-project.component';
import {MaterialModule} from '../../../material/material.module';
import {ProjectService} from '../../project.service';

describe('DeleteProjectComponent', () => {
  let component: DeleteProjectComponent;
  let fixture: ComponentFixture<DeleteProjectComponent>;
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
        DeleteProjectComponent
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
          useValue: {data: 'Texas city'}
        }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
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
