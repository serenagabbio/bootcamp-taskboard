import { environment } from './../../environments/environment';

import { TasksHttpService } from './tasks-services/tasks-http.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TasksQuickAddComponent } from './tasks-quick-add/tasks-quick-add.component';
import { TaskBoardComponent } from './task-board.component';
import { TasksListComponent } from './tasks-list/tasks-list.component';
import { TasksCardComponent } from './tasks-card/tasks-card.component';
import { ReactiveFormsModule } from '@angular/forms';
import { TasksService } from './tasks-services/tasks.service.base';
import { TasksLocalService } from './tasks-services/tasks-local.service';
import { HttpClientModule } from '@angular/common/http';
import { provideAppConfig } from '../app-configuration';

@NgModule({
  declarations: [
    TasksQuickAddComponent,
    TasksListComponent,
    TasksCardComponent,
    TaskBoardComponent
  ],
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule],
  exports: [TaskBoardComponent],
  providers: [ 
    provideAppConfig,
    {
      provide: TasksService,
      useClass: !environment.production ? TasksHttpService : TasksLocalService
    }
  ]
})
export class TaskBoardModule {}
