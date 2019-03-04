import { Injectable } from '@angular/core';
import { TasksService, TaskDraft, TaskFromApi } from './tasks.service.base';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Guid } from 'guid-typescript';

@Injectable({
  providedIn: 'root'
})
export class TasksHttpService implements TasksService {
  constructor(private http: HttpClient) {}

  getAll(): Observable<TaskFromApi[]> {
    return this.http.get<TaskFromApi[]>('http://localhost:3000/tasks');
  }

  create(task: TaskDraft): Observable<TaskFromApi> {
    const completeTask: TaskFromApi = {
      title: task.title,
      text: task.text,
      guid: Guid.create().toString(),
      writtenAt: new Date(),
      isInProgress: false,
      isComplete: false,
      isFavorite: false
    };
    return this.http.post<TaskFromApi>(
      'http://localhost:3000/tasks',
      completeTask
    );
  }

  update(task: TaskDraft): Observable<TaskFromApi> {
    const completeTask: TaskFromApi = {
      title: task.title,
      text: task.text,
      guid: Guid.create().toString(),
      writtenAt: new Date(),
      isInProgress: false,
      isComplete: false,
      isFavorite: false
    };
    return this.http.post<TaskFromApi>(
      'http://localhost:3000/tasks',
      completeTask
    );
  }

  delete(task: TaskFromApi): Observable<TaskFromApi> {
    const guid = task.guid;
    return this.http.delete<TaskFromApi>('http://localhost:3000/tasks/' + guid);
  }
}
