import { TestBed } from '@angular/core/testing';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { InjectionToken } from '@angular/core';
import { provideAppConfig } from 'src/app/app-configuration';
import { TasksLocalService } from './tasks-local.service';

describe('TasksLocalService', () => {
  let tasksLocalService: TasksLocalService;
  const injectionToken = new InjectionToken('app-config');
  let existingTaskGuid: string;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        HttpClient,
        HttpHandler,
        TasksLocalService,
        provideAppConfig,
        {
          provide: InjectionToken,
          useValue: injectionToken
        }
      ]
    });
    tasksLocalService = TestBed.get(TasksLocalService);
    tasksLocalService
      .create({ title: 'title', text: 'text' })
      .subscribe(value => (existingTaskGuid = value.guid));
  });

  it('should be created', () => {
    const service: TasksLocalService = TestBed.get(TasksLocalService);
    expect(service).toBeTruthy();
  });

  it('should create a new task and return a new complete task', () => {
    tasksLocalService
      .create({ title: 'title', text: 'text' })
      .subscribe(value => expect(value).toBeTruthy());
  });

  it('should return a single task if called get', () => {
    tasksLocalService
      .get(existingTaskGuid)
      .subscribe(value => expect(value).toBeTruthy());
  });

  it('should return all the tasks if called getAll', () => {
    tasksLocalService.getAll().subscribe(values => {
      expect(values).toBeTruthy();
    });
  });

  it('should update a tasks', () => {
    const newTask = {
      guid: existingTaskGuid,
      title: 'new title',
      text: 'task text',
      writtenAt: new Date(),
      isInProgress: false,
      isComplete: false,
      isFavourite: false
    };
    tasksLocalService.update(newTask).subscribe(value => {
      expect(value).toBeTruthy();
    });
  });

  it('should delete a task', () => {
    tasksLocalService.delete(existingTaskGuid).subscribe(value => {
      expect(value).toBeTruthy();
    });
  });
});
