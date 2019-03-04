import { TestBed } from '@angular/core/testing';

import { TasksLocalService } from './tasks-local.service';

describe('TasksLocalService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TasksLocalService = TestBed.get(TasksLocalService);
    expect(service).toBeTruthy();
  });
});
