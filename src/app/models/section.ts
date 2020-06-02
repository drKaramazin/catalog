import { Item } from './item';

export interface Section {
  items: Item[],
  name: string,
  sections: Section[],
}
