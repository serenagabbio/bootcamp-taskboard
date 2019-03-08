import { HttpClient, HttpHandler } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { TasksHttpService } from './tasks-http.service';
import { InjectionToken } from '@angular/core';
import { provideAppConfig } from 'src/app/app-configuration';

describe('TasksHttpService', () => {
  let tasksHttpService: TasksHttpService;
  const injectionToken = new InjectionToken('app-config');
  let existingTaskGuid: string;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HttpClient, HttpHandler, TasksHttpService, provideAppConfig, {
        provide: InjectionToken,
        useValue: injectionToken
      }]
    });
    tasksHttpService = TestBed.get(TasksHttpService);
    tasksHttpService.create({title: 'title', text: 'text'}).subscribe(
      value =>  existingTaskGuid = value.guid
    );
  });

  it('should be created', () => {
    expect(tasksHttpService).toBeTruthy();
  });

  it('should create a new task and return a new complete task', () => {
    tasksHttpService.create({title: 'title', text: 'text'}).subscribe(
      value =>  expect(value).toBeTruthy()
    );
  });

  it('should return a single task if called get', () => {
    tasksHttpService.get(existingTaskGuid).subscribe(
      value => expect(value).toBeTruthy()
    );
  });

  it('should return all the tasks if called getAll', () => {
    tasksHttpService.getAll().subscribe(
      (values) => {
        expect(values).toBeTruthy();
      }
    );
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
    tasksHttpService.update(newTask).subscribe(
      (value) => {
        expect(value).toBeTruthy();
      }
    );
  });

  it('should delete a task', () => {
    tasksHttpService.delete(existingTaskGuid).subscribe(
      (value) => {
        expect(value).toBeTruthy();
      }
    );
  });

});
