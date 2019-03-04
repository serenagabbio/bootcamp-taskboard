import { HttpClient, HttpHandler } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { TasksHttpService } from './tasks-http.service';

describe('TasksHttpService', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      providers: [HttpClient, HttpHandler]
    })
  );

  it('should be created', () => {
    const service: TasksHttpService = TestBed.get(TasksHttpService);
    expect(service).toBeTruthy();
  });
});
