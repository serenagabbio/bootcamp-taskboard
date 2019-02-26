import { TaskBoardModule } from './task-board/task-board.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, TaskBoardModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
