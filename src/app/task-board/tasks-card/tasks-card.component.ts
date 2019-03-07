import { Component, OnInit, Input, EventEmitter, Output, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { TaskFromApi } from '../tasks-services/tasks.service.base';
import { HighlightService } from '../tasks-services/highlight.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'tb-tasks-card',
  templateUrl: './tasks-card.component.html',
  styleUrls: ['./tasks-card.component.scss']
})
export class TasksCardComponent implements OnInit, OnDestroy {
  @Input() task: TaskFromApi;
  @Output() taskUpdated = new EventEmitter<TaskFromApi>();
  @Output() taskDeleted = new EventEmitter<TaskFromApi>();
  @ViewChild('text') textElement: ElementRef;
  @ViewChild('title') titleElement: ElementRef;
  
  isTitleHighlight: boolean = false;
  isTextHighlight: boolean = false;
  editMode: boolean = false;
  titleSubscription$ = new Subscription();
  textSubscription$ = new Subscription();

  constructor(private highlightService: HighlightService) {}

  ngOnInit() {
    this.titleSubscription$ = this.highlightService.titleKeyUp$$.subscribe(data => {
      this.isTitleHighlight =
        data && this.task.title.toLowerCase().includes(data.toLowerCase());
    });
    this.textSubscription$ = this.highlightService.textKeyUp$$.subscribe(data => {
      this.isTextHighlight =
        data && this.task.text.toLowerCase().includes(data.toLowerCase());
    });
  }

  onCardMoved() {
    if(this.task.isComplete){
      throw new Error("Cannot move a task completed");
    }
    if (this.task.isInProgress) {
      this.task.isInProgress = false;
      this.task.isComplete = true;
      this.task.isFavourite = false;
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

  onDoubleClick() {
    if (!this.editMode) {
      this.editMode = true;
    } else {
      this.onCardEdited();
    }
  }

  onCardEdited() {
    this.editMode = false;
    this.task.title = this.titleElement.nativeElement.textContent;
    this.task.text = this.textElement.nativeElement.textContent;
    this.taskUpdated.emit(this.task);
  }

  ngOnDestroy(){
    this.titleSubscription$.unsubscribe();
    this.textSubscription$.unsubscribe();
  }
  
}