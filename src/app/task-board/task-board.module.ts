import { Task } from './tasks-card/task.model';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TasksQuickAddComponent } from './tasks-quick-add/tasks-quick-add.component';
import { TaskBoardComponent } from './task-board.component';
import { TasksListComponent } from './tasks-list/tasks-list.component';
import { TasksCardComponent } from './tasks-card/tasks-card.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    TasksQuickAddComponent,
    TasksListComponent,
    TasksCardComponent,
    TaskBoardComponent
  ],
  imports: [CommonModule, FormsModule],
  exports: [TaskBoardComponent]
})
export class TaskBoardModule {}
