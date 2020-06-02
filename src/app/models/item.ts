import { DataItem } from './data-item';
import { guid } from './guid';

export interface Item extends DataItem {
  id: guid;
}
