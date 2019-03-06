import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {
  TasksService,
  TaskFromApi,
  TaskDraft
} from '../tasks-services/tasks.service.base';
import { FormGroup, FormControl } from '@angular/forms';
import { HighlightService } from '../tasks-services/highlight.service';

@Component({
  selector: 'tb-tasks-quick-add',
  templateUrl: './tasks-quick-add.component.html',
  styleUrls: ['./tasks-quick-add.component.scss']
})
export class TasksQuickAddComponent implements OnInit {
  taskForm: FormGroup;

  @Output() taskCreated = new EventEmitter<TaskDraft>();

  constructor(private highlightService: HighlightService) {}

  ngOnInit() {
    this.taskForm = new FormGroup({
      title: new FormControl(''),
      text: new FormControl('')
    });
  }

  resetForm() {
    this.taskForm.reset();
  }

  saveForm() {
    this.taskCreated.emit({
      title: this.taskForm.get('title').value,
      text: this.taskForm.get('text').value
    });
    this.resetForm();
  }

  onTitleKeyUp() {
    this.highlightService.titleKeyUp.next(this.taskForm.get('title').value);
  }

  onTextKeyUp() {
    this.highlightService.textKeyUp.next(this.taskForm.get('text').value);
  }
}
