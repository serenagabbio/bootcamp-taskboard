import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TasksQuickAddComponent } from './tasks-quick-add.component';
import { NO_ERRORS_SCHEMA } from '@angular/compiler/src/core';
import { By } from '@angular/platform-browser';

describe('TasksQuickAddComponent', () => {
  let component: TasksQuickAddComponent;
  let fixture: ComponentFixture<TasksQuickAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TasksQuickAddComponent],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TasksQuickAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit event when save is clicked ', () => {
    spyOn(component.taskCreated, 'emit');
    const title = fixture.debugElement.query(By.css('input'));
    title.nativeElement.value = 'Title';

    const button = fixture.debugElement.query(By.css('button'));
    button.nativeElement.click();
    expect(component.taskCreated.emit).toHaveBeenCalled();
  });

  it('should reset form after saving', () => {
    const title = fixture.debugElement.query(By.css('input'));
    title.nativeElement.value = 'Title';
    const button = fixture.debugElement.query(By.css('button'));
    component.taskCreated.subscribe(() => {
      fixture.detectChanges();
      expect(title.nativeElement.value).toBeNull();
    });
    button.nativeElement.click();
  });
});
