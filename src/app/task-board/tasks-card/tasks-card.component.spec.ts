import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TasksCardComponent } from './tasks-card.component';
import { By } from '@angular/platform-browser';

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
    component.move();
    expect(component.task.isInProgress).toBeTruthy();
  });

  it('should move card from doing to done', () => {
    component.task.isInProgress = true;
    component.move();
    expect(component.task.isComplete).toBeTruthy();
  });

  it('should throw error if try to move a completed task card', () => {
    component.task.isComplete = true;
    try {
      component.move();
    } catch (error) {
      expect(error.message).toEqual('Cannot move a task completed');
    }
  });

  it('should add card to favourite', () => {
    component.onFavourite();
    expect(component.task.isFavourite).toBeTruthy();
  });

  it('should remove card from favourite', () => {
    component.task.isFavourite = true;
    component.onFavourite();
    expect(component.task.isFavourite).toBeFalsy();
  });

  it('should open editMode if do double click', () => {
    const card = fixture.debugElement.query(By.css('.tasks-card'));
    card.nativeElement.dispatchEvent(new Event('dblclick'));
    expect(component.editMode).toBeTruthy();
  });

  it('should close editMode if click save during edit mode', () => {
    component.editMode = true;
    fixture.detectChanges();
    const button = fixture.debugElement.query(By.css('#edit-button'));
    button.nativeElement.dispatchEvent(new Event('click'));
    fixture.detectChanges();
    expect(component.editMode).toBeFalsy();
  });

  it('text should have differences after save editing', () => {
    const oldText = component.task.text;
    component.editMode = true;
    component.text = 'another text';
    fixture.detectChanges();
    const button = fixture.debugElement.query(By.css('#edit-button'));
    button.nativeElement.dispatchEvent(new Event('click'));
    expect(component.task.text).not.toEqual(oldText);
  });

  afterEach(() => {
    spyOn(component.titleSubscription$, 'unsubscribe');
    spyOn(component.textSubscription$, 'unsubscribe');
    fixture.destroy();
    expect(component.textSubscription$.unsubscribe).toHaveBeenCalled();
    expect(component.titleSubscription$.unsubscribe).toHaveBeenCalled();
  });
});
