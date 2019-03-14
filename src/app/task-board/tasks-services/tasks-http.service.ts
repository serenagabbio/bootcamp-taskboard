import { Injectable, Inject } from '@angular/core';
import { TasksService, TaskDraft, TaskFromApi } from './tasks.service.base';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Guid } from 'guid-typescript';
import { AppConfiguration, APP_CONFIG } from 'src/app/app-configuration';

@Injectable({
  providedIn: 'root'
})
export class TasksHttpService implements TasksService {
  baseUrl: string;

  constructor(
    private http: HttpClient,
    @Inject(APP_CONFIG) private config: AppConfiguration
  ) {
    this.baseUrl = this.config.apiTasksUrl;
  }

  getAll(): Observable<TaskFromApi[]> {
    return this.http.get<TaskFromApi[]>(this.baseUrl);
  }

  get(guid: string): Observable<TaskFromApi[]> {
    return this.http.get<TaskFromApi[]>(`${this.baseUrl} /  ${guid}`);
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
    return this.http.post<TaskFromApi>(this.baseUrl, completeTask);
  }

  update(task: TaskFromApi): Observable<TaskFromApi> {
    return this.http.put<TaskFromApi>(this.baseUrl, task);
  }

  delete(guid: string): Observable<TaskFromApi> {
    return this.http.delete<TaskFromApi>(this.baseUrl + '/' + guid);
  }
}
