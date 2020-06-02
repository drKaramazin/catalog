import { DataItem } from './data-item';

export interface DataSection {
  items: DataItem[];
  name: string;
  sections: DataSection[];
}
