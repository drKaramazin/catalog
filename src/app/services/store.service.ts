import { Injectable } from '@angular/core';
import { Section } from '../models/section';

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  readonly ITEM_NAME = 'sections';

  constructor() { }

  read(): Section[] {
    return JSON.parse(localStorage.getItem(this.ITEM_NAME));
  }

}
