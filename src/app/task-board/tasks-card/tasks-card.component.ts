import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { TaskFromApi } from '../tasks-services/tasks.service.base';

@Component({
  selector: 'tb-tasks-card',
  templateUrl: './tasks-card.component.html',
  styleUrls: ['./tasks-card.component.scss']
})
export class TasksCardComponent implements OnInit {
  @Input() task: TaskFromApi;
  @Output() taskUpdated = new EventEmitter<TaskFromApi>();
  @Output() taskDeleted = new EventEmitter<TaskFromApi>();

  constructor() {}

  ngOnInit() {}

  onCardUpdated() {
    this.taskUpdated.emit(this.task);
  }

  onCardDeleted() {
    this.taskDeleted.emit(this.task);
  }
}
