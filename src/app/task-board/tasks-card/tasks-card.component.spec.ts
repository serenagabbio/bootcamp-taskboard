import { NO_ERRORS_SCHEMA, createInput } from '@angular/compiler/src/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TasksCardComponent } from './tasks-card.component';

describe('TasksCardComponent', () => {
  let component: TasksCardComponent;
  let fixture: ComponentFixture<TasksCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TasksCardComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TasksCardComponent);
    component = fixture.componentInstance;
    component.task = {
      guid: '',
      title: 'TO DO',
      text: 'prova',
      writtenAt: new Date(),
      isInProgress: false,
      isComplete: false,
      isFavourite: false
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
