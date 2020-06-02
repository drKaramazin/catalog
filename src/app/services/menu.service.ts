import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { Section } from '../models/section';
import { StoreService } from './store.service';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  sections = new BehaviorSubject<Section[]>([]);

  constructor(
    private store: StoreService,
    private dataService: DataService,
  ) {}

  init() {
    const sections = this.store.read();
    if (sections) {
      this.sections.next(sections);
    } else {
      this.dataService.read().subscribe((sections) => this.sections.next(sections));
    }
  }

}
