import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { TaskFromApi } from '../tasks-services/tasks.service.base';

@Component({
  selector: 'tb-tasks-list',
  templateUrl: './tasks-list.component.html',
  styleUrls: ['./tasks-list.component.scss']
})
export class TasksListComponent implements OnInit {
  @Input() taskList: TaskFromApi[];
  @Input() title: string;
  @Output() taskUpdated = new EventEmitter<TaskFromApi>();
  @Output() taskDeleted = new EventEmitter<TaskFromApi>();

  constructor() {}

  ngOnInit() {}

  onTaskUpdated(event: TaskFromApi) {
    this.taskUpdated.emit(event);
  }

  onTaskDeleted(event: TaskFromApi) {
    this.taskDeleted.emit(event);
  }
}
