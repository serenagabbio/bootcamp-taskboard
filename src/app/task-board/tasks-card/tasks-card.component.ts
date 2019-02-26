import { Task } from './task.model';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'tb-tasks-card',
  templateUrl: './tasks-card.component.html',
  styleUrls: ['./tasks-card.component.scss']
})
export class TasksCardComponent implements OnInit {
  @Input() task: Task;

  constructor() {}

  ngOnInit() {
    console.log('task: ' + this.task.toString());
  }
}
