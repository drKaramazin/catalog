import { Item } from './item';
import { DataSection } from './data-section';
import { guid } from './guid';

export interface Section extends DataSection {
  id: guid;
  items: Item[];
  sections: Section[];
  color: string;
}
