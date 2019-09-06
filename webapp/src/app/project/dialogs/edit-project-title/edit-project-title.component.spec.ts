import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {EditProjectTitleComponent} from './edit-project-title.component';

describe('EditProjectTitleComponent', () => {
  let component: EditProjectTitleComponent;
  let fixture: ComponentFixture<EditProjectTitleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EditProjectTitleComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditProjectTitleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
