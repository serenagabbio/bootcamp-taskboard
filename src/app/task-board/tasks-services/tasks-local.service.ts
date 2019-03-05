import { Injectable, EventEmitter } from '@angular/core';
import { TasksService, TaskDraft, TaskFromApi } from './tasks.service.base';
import { Observable, defer, of } from 'rxjs';
import { Guid } from 'guid-typescript';

@Injectable({
  providedIn: 'root'
})
export class TasksLocalService implements TasksService {
  taskList: TaskFromApi[] = [];
  taskUpdated = new EventEmitter<TaskFromApi>();

  constructor() {}

  getAll(): Observable<TaskFromApi[]> {
    return of(this.taskList);
  }

  create(task: TaskDraft): Observable<TaskFromApi> {
    const completeTask: TaskFromApi = {
      title: task.title,
      text: task.text,
      guid: Guid.create().toString(),
      writtenAt: new Date(),
      isInProgress: false,
      isComplete: false,
      isFavourite: false
    };
    this.taskList.push(completeTask);
    return of(completeTask);
  }

  update(task: TaskFromApi): Observable<TaskFromApi> {
    const index = this.taskList.findIndex(
      element => element.guid === task.guid
    );
    if (index) {
      this.taskList[index] = task;
    }
    return of(task);
  }

  delete(guid: string): Observable<TaskFromApi> {
    const index = this.taskList.findIndex(element => element.guid === guid);
    if (index) {
      this.taskList.splice(index, 1);
    }
    return of(this.taskList[index]);
  }

  get(guid: string): Observable<TaskFromApi[]> {
    let tasksList = this.taskList.filter(element => element.guid === guid);
    return of(tasksList);
  }
}
