import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HighlightService {
  titleKeyUp$$ = new Subject<string>();
  textKeyUp$$ = new Subject<string>();

  constructor() {}

  emitTitleKeyUp(title: string) {
    this.titleKeyUp$$.next(title);
  }

  emitTextKeyUp(text: string) {
    this.textKeyUp$$.next(text);
  }

  isHighlighted(searchText: string, taskText: string) {
    return (
      searchText && taskText.toLowerCase().includes(searchText.toLowerCase())
    );
  }
}
