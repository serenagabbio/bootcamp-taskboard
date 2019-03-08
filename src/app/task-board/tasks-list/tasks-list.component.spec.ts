import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TasksListComponent } from './tasks-list.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { TaskFromApi } from '../tasks-services/tasks.service.base';

describe('TasksListComponent', () => {
  let component: TasksListComponent;
  let fixture: ComponentFixture<TasksListComponent>;
  let task: TaskFromApi;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TasksListComponent],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TasksListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    task = {
      guid: '123',
      title: 'task title',
      text: 'task text',
      writtenAt: new Date(),
      isInProgress: false,
      isComplete: false,
      isFavourite: false
    }
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit an event when receive a task updated event', async () => {
    spyOn(component.taskUpdated, 'emit');
    await component.onTaskUpdated(task);
    expect(component.taskUpdated.emit).toHaveBeenCalled();
  });

  it('should emit an event when receive a task deleted event', async () => {
    spyOn(component.taskDeleted, 'emit');
    await component.onTaskDeleted(task);
    expect(component.taskDeleted.emit).toHaveBeenCalled();
  });
});
