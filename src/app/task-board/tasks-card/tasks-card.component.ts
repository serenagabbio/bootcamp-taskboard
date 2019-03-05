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

  onCardMoved() {
    if (this.task.isInProgress) {
      this.task.isInProgress = false;
      this.task.isComplete = true;
    } else if (!this.task.isInProgress && !this.task.isComplete) {
      this.task.isInProgress = true;
    }
    this.taskUpdated.emit(this.task);
  }

  onCardDeleted() {
    this.taskDeleted.emit(this.task);
  }

  onFavourite() {
    this.task.isFavourite = !this.task.isFavourite;
    this.taskUpdated.emit(this.task);
  }
}
