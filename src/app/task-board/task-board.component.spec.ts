import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskBoardComponent } from './task-board.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { TasksService } from './tasks-services/tasks.service.base';
import { TasksLocalService } from './tasks-services/tasks-local.service';

describe('TaskBoardComponent', () => {
  let component: TaskBoardComponent;
  let fixture: ComponentFixture<TaskBoardComponent>;
  const localService = new TasksLocalService();

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TaskBoardComponent],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        {
          provide: TasksService,
          useValue: localService
        }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
