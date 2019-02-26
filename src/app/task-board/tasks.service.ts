import { Task } from './tasks-card/task.model';
import { Observable, ObservableInput } from 'rxjs';
import { Guid } from 'guid-typescript';

const id = Guid.create().toString();

export interface TaskDraft {
  title: string;
  text?: string;
}

export interface TaskFromApi {
  guid: string;
  title: string;
  text: string;
  writtenAt: Date;
  isDoing: boolean;
  isDone: boolean;
  isFavorite: boolean;
  //use async pipe inside template
}

export abstract class TasksService {
  abstract getAll(): ObservableInput<TaskFromApi[]>;
  abstract create(): ObservableInput<TaskFromApi>;
  abstract update(): Observable<TaskFromApi>;
}
