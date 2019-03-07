import { Component, OnInit } from '@angular/core';
import {
  TasksService,
  TaskDraft,
  TaskFromApi
} from './tasks-services/tasks.service.base';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'tb-task-board',
  templateUrl: './task-board.component.html',
  styleUrls: ['./task-board.component.scss']
})
export class TaskBoardComponent implements OnInit {
  taskListToDo: TaskFromApi[] = [];
  taskListDoing: TaskFromApi[] = [];
  taskListDone: TaskFromApi[] = [];

  constructor(private tasksService: TasksService) {}

  ngOnInit() {
    this.tasksService.getAll().subscribe(taskList => {
      this.filterTaskLists(taskList);
    });
  }

  filterTaskLists(taskList) {
    this.taskListToDo = taskList.filter(
      task => !task.isInProgress && !task.isComplete
    );
    this.taskListDoing = taskList.filter(task => task.isInProgress);
    this.taskListDone = taskList.filter(task => task.isComplete);
  }

  onTaskCreated(taskCreated: TaskDraft) {
    this.tasksService
      .create(taskCreated)
      .pipe(switchMap(() => this.tasksService.getAll()))
      .subscribe(taskList => {
        this.filterTaskLists(taskList);
      });
  }

  onTaskUpdated(taskUpdated: TaskFromApi) {
    this.tasksService
      .update(taskUpdated)
      .pipe(switchMap(() => this.tasksService.getAll()))
      .subscribe(taskList => {
        this.filterTaskLists(taskList);
      });
  }

  onTaskDeleted(taskDeleted: TaskFromApi) {
    this.tasksService
      .delete(taskDeleted.guid)
      .pipe(switchMap(() => this.tasksService.getAll()))
      .subscribe(taskList => {
        this.filterTaskLists(taskList);
      });
  }
}
