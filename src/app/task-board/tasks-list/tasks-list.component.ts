import { Task } from '../tasks-card/task.model';
import { TasksCardComponent } from './../tasks-card/tasks-card.component';
import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { EventListener } from '@angular/core/src/debug/debug_node';

@Component({
  selector: 'tb-tasks-list',
  templateUrl: './tasks-list.component.html',
  styleUrls: ['./tasks-list.component.scss']
})
export class TasksListComponent implements AfterViewInit {
  @Input() tasksList: Task[];

  constructor() {}

  ngAfterViewInit() {
    //this.tasksList = [new Task('task', 'description')];
  }
}
