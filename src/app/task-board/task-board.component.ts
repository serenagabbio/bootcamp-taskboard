import { Component, OnInit, OnDestroy } from '@angular/core';
import {
  TasksService,
  TaskDraft,
  TaskFromApi
} from './tasks-services/tasks.service.base';
import { switchMap } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'tb-task-board',
  templateUrl: './task-board.component.html',
  styleUrls: ['./task-board.component.scss']
})
export class TaskBoardComponent implements OnInit, OnDestroy {
  taskListToDo: TaskFromApi[] = [];
  taskListDoing: TaskFromApi[] = [];
  taskListDone: TaskFromApi[] = [];
  getAllSubscription$ = new Subscription();
  subscription$: Subscription;

  constructor(private tasksService: TasksService) {}

  ngOnInit() {
    this.getAllSubscription$ = this.tasksService
      .getAll()
      .subscribe(taskList => {
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

  create(taskCreated: TaskDraft) {
    const createSubscription$ = this.tasksService
      .create(taskCreated)
      .pipe(switchMap(() => this.tasksService.getAll()))
      .subscribe(
        taskList => {
          this.filterTaskLists(taskList);
        },
        error => {
          console.log(error);
        }
      );
  }

  update(taskUpdated: TaskFromApi) {
    const updateSubscription$ = this.tasksService
      .update(taskUpdated)
      .pipe(switchMap(() => this.tasksService.getAll()))
      .subscribe(
        taskList => this.filterTaskLists(taskList),
        error => console.log(error)
      );
  }

  onTaskDeleted(taskDeleted: TaskFromApi) {
    const deleteSubscription$ = this.tasksService
      .delete(taskDeleted.guid)
      .pipe(switchMap(() => this.tasksService.getAll()))
      .subscribe(
        taskList => this.filterTaskLists(taskList),
        error => console.log(error)
      );
  }

  ngOnDestroy() {
    this.getAllSubscription$.unsubscribe();
  }
}
