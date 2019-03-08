import { TestBed } from '@angular/core/testing';

import { HighlightService } from './highlight.service';

describe('HighlightService', () => {
  let service: HighlightService;

  beforeEach(async () => {
    TestBed.configureTestingModule({});
    service = TestBed.get(HighlightService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should emit a title key up event', () => {
    spyOn(service.titleKeyUp$$, 'next');
    service.emitTitleKeyUp('title');
    expect(service.titleKeyUp$$.next).toHaveBeenCalled();
  });

  it('should emit a text key up event', () => {
    spyOn(service.textKeyUp$$, 'next');
    service.emitTextKeyUp('text');
    expect(service.textKeyUp$$.next).toHaveBeenCalled();
  });

  it('should highlight if same text', () => {
    expect(service.isHighlighted('text', 'text')).toBeTruthy();
  });

  it('should highlight if different text', () => {
    expect(service.isHighlighted('text', 'no')).toBeFalsy();
  });

  it('should highlight if same text ignoring capitalization', () => {
    expect(service.isHighlighted('text', 'TEXT')).toBeTruthy();
  });

  it('should highlight if text is included', () => {
    expect(service.isHighlighted('ex', 'TEXT')).toBeTruthy();
  });
});
