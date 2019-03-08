import {
  Component,
  OnInit,
  Input,
  EventEmitter,
  Output,
  ViewChild,
  ElementRef,
  OnDestroy
} from '@angular/core';
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
  edited = false;

  isTitleHighlighted = false;
  isTextHighlighted = false;
  editMode = false;
  titleSubscription$ = new Subscription();
  textSubscription$ = new Subscription();

  constructor(private highlightService: HighlightService) {}

  ngOnInit() {
    this.titleSubscription$ = this.highlightService.titleKeyUp$$.subscribe(
      data =>
        (this.isTitleHighlighted = this.highlightService.isHighlighted(
          data,
          this.task.title
        ))
    );
    this.textSubscription$ = this.highlightService.textKeyUp$$.subscribe(
      data =>
        (this.isTextHighlighted = this.highlightService.isHighlighted(
          data,
          this.task.text
        ))
    );
  }

  onCardMoved() {
    if (this.task.isComplete) {
      throw new Error('Cannot move a task completed');
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

  onEdit() {
    if (this.editMode) {
      this.titleElement.nativeElement.textContent = this.task.title.toUpperCase();
      this.textElement.nativeElement.textContent = this.task.text;
    }
    this.editMode = !this.editMode;
  }

  onSaveEdited() {
    this.editMode = false;
    this.task.title = this.titleElement.nativeElement.textContent;
    this.task.text = this.textElement.nativeElement.textContent;
    this.taskUpdated.emit(this.task);
  }

  checkEditing() {
    this.edited = !(
      this.task.title.toUpperCase().trim() ===
        this.titleElement.nativeElement.textContent.trim() &&
      this.task.text.trim() ===
        this.textElement.nativeElement.textContent.trim()
    );
  }

  ngOnDestroy() {
    this.titleSubscription$.unsubscribe();
    this.textSubscription$.unsubscribe();
  }
}
