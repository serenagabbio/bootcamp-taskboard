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

  get(guid: string): Observable<TaskFromApi[]> {
    return this.http.get<TaskFromApi[]>('http://localhost:3000/tasks/' + guid);
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
    return this.http.post<TaskFromApi>(
      'http://localhost:3000/tasks',
      completeTask
    );
  }

  update(task: TaskFromApi): Observable<TaskFromApi> {
    return this.http.put<TaskFromApi>('http://localhost:3000/tasks', task);
  }

  delete(guid: string): Observable<TaskFromApi> {
    return this.http.delete<TaskFromApi>('http://localhost:3000/tasks/' + guid);
  }
}
