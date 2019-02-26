import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TasksQuickAddComponent } from './tasks-quick-add.component';

describe('TasksQuickAddComponent', () => {
  let component: TasksQuickAddComponent;
  let fixture: ComponentFixture<TasksQuickAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TasksQuickAddComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TasksQuickAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
