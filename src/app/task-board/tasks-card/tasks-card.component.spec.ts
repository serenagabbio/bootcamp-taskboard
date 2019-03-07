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
      title: 'task title',
      text: 'task text',
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

  it('should move card from todo to doing', () => {
    component.onCardMoved();
    expect(component.task.isInProgress).toBeTruthy();
  });

  it('should move card from doing to done', () => {
    component.task.isInProgress = true;
    component.onCardMoved();
    expect(component.task.isComplete).toBeTruthy();
  });

  it('should throw error if try to move a completed task card', () => {
    component.task.isComplete = true;
    try{
      component.onCardMoved()
    }catch(error){
      expect(error.message).toEqual("Cannot move a task completed");
    }
  });

  it('should add card to favourite', () => {
    component.onFavourite();
    expect(component.task.isFavourite).toBeTruthy();
  });

  it('should remove card to favourite', () => {
    component.task.isFavourite = true;
    component.onFavourite();
    expect(component.task.isFavourite).toBeFalsy();
  });

  it('should open editMode if do double click', () => {
    component.onDoubleClick();
    expect(component.editMode).toBeTruthy();
  });

  it('should close editMode if click save during edit mode', () => {
    component.editMode = true;
    component.onCardEdited();
    expect(component.editMode).toBeFalsy();
  });

});
