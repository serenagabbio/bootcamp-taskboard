import { Task } from '../tasks-card/task.model';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'tb-tasks-quick-add',
  templateUrl: './tasks-quick-add.component.html',
  styleUrls: ['./tasks-quick-add.component.scss']
})
export class TasksQuickAddComponent implements OnInit {
  @Output() taskCard = new EventEmitter<Task>();
  name: string;
  description: string;

  constructor() {}

  ngOnInit() {}

  saveForm() {
    this.taskCard.emit(new Task(this.name, this.description));
  }
}
