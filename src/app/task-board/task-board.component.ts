import { Task } from './tasks-card/task.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'tb-task-board',
  templateUrl: './task-board.component.html',
  styleUrls: ['./task-board.component.scss']
})
export class TaskBoardComponent implements OnInit {
  tasksList: Task[];

  constructor() {}

  ngOnInit() {
    this.tasksList = [];
  }

  onTaskCreated(event) {
    this.tasksList.push(new Task(event.title, event.description));
  }
}
