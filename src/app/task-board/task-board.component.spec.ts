import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskBoardComponent } from './task-board.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { TasksService } from './tasks-services/tasks.service.base';
import { TasksLocalService } from './tasks-services/tasks-local.service';

describe('TaskBoardComponent', () => {
  let component: TaskBoardComponent;
  let fixture: ComponentFixture<TaskBoardComponent>;
  const localService = new TasksLocalService();

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TaskBoardComponent],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        {
          provide: TasksService,
          useValue: localService
        }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should filter tasks by complete status', () => {
    const taskToDo = {
      guid: '123',
      title: 'task title',
      text: 'task text',
      writtenAt: new Date(),
      isInProgress: false,
      isComplete: false,
      isFavourite: false
    };
    const taskDoing = {
      guid: '123',
      title: 'task title',
      text: 'task text',
      writtenAt: new Date(),
      isInProgress: true,
      isComplete: false,
      isFavourite: false
    };
    const taskLists = [taskToDo, taskDoing];
    component.filterTaskLists(taskLists);
    expect(component.taskListToDo.length).toEqual(1);
    expect(component.taskListToDo[0].guid).toEqual(taskToDo.guid);
    expect(component.taskListDoing.length).toEqual(1);
    expect(component.taskListDoing[0]).toEqual(taskDoing);
  });

  it('should create a new task', async () => {
    const oldLength = component.taskListToDo.length;
    const taskToDo = {
      guid: '123',
      title: 'task title'
    };
    await component.create(taskToDo);
    expect(component.taskListToDo.length).toBeGreaterThan(oldLength);
  });

  it('should update a task', async () => {
    await component.create({ title: 'task title', text: 'task text' });
    const task = component.taskListToDo[component.taskListToDo.length - 1];
    task.title = 'new title';
    await component.update(task);
    const updatedTask = component.taskListToDo[component.taskListToDo.length - 1];
    expect(updatedTask.title).toEqual('new title');
  });

  it('should delete a task', async () => {
    const oldLength = component.taskListToDo.length;
    const taskToDo = {
      guid: '123',
      title: 'task title',
      text: 'task text',
      writtenAt: new Date(),
      isInProgress: false,
      isComplete: false,
      isFavourite: false
    };
    await component.create(taskToDo);
    await component.onTaskDeleted(taskToDo);
    expect(component.taskListToDo.length).toBeGreaterThanOrEqual(oldLength);
  });
});
