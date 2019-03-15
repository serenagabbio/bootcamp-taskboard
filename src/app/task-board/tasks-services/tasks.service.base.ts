import { Observable } from 'rxjs';

export interface TaskDraft {
  title: string;
  text?: string;
}

export interface TaskFromApi {
  guid: string;
  title: string;
  text: string | undefined;
  writtenAt: Date;
  isInProgress: boolean;
  isComplete: boolean;
  isFavourite: boolean;
}

export abstract class TasksService {
  abstract getAll(): Observable<TaskFromApi[]>;
  abstract create(task: TaskDraft): Observable<TaskFromApi>;
  abstract update(task: TaskFromApi): Observable<TaskFromApi>;
  abstract delete(guid: string): Observable<TaskFromApi>;
  abstract get(guid: string): Observable<TaskFromApi>;
}
