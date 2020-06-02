import { Section } from './section';

export interface MenuSection extends Section {
  opened: boolean;
  sections: MenuSection[];
}
