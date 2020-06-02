import { Injectable } from '@angular/core';

import { MenuSection } from '../models/menu-section';
import { Section } from '../models/section';
import { guid } from '../models/guid';
import { FoundedSection } from '../models/founded-section';
import { FoundedItem } from '../models/founded-item';
import { SectionForm } from '../models/section-form';
import { UtilService } from './util.service';
import { ItemForm } from '../models/item-form';
import { Item } from '../models/item';

@Injectable({
  providedIn: 'root'
})
export class SectionService {

  constructor() { }

  getAllSections(sections: Section[]): Section[] {
    let result = [];
    for (const item of sections) {
      result.push(item);
      if (item.sections && item.sections.length) {
        const internalSections = this.getAllSections(item.sections);
        if (internalSections) {
          result = result.concat(internalSections);
        }
      }
    }

    return result;
  }

  findSection(sections: Section[], id: guid): Section {
    for (const item of sections) {
      if (item.id === id) {
        return item;
      }
      if (item.sections) {
        const founded = this.findSection(item.sections, id);
        if (founded) {
          return founded;
        }
      }
    }

    return null;
  }

  findSectionIndex(sections: Section[], id: guid): FoundedSection {
    for (let i = 0; i < sections.length; i++) {
      if (sections[i].id === id) {
        return {
          parent: sections,
          index: i,
        };
      }
      if (sections[i].sections) {
        const founded = this.findSectionIndex(sections[i].sections, id);
        if (founded) {
          return founded;
        }
      }
    }

    return null;
  }

  findItemIndex(sections: Section[], id: guid): FoundedItem {
    for (const section of sections) {
      const index = section.items.findIndex((item) => item.id === id);
      if (index >= 0) {
        return {
          parent: section.items,
          index: index,
        };
      } else {
        if (section.sections && section.sections.length) {
          const founded = this.findItemIndex(section.sections, id);
          if (founded) {
            return founded;
          }
        }
      }
    }
  }

  sectionToMenuSection(source: Section[]): MenuSection[] {
    const result: MenuSection[] = [];

    source.forEach((section) => {
      const newSection: MenuSection = {
        name: section.name,
        id: section.id,
        sections: section.sections && section.sections.length ? this.sectionToMenuSection(section.sections) : [],
        items: section.items && section.items.length ? section.items : [],
        color: section.color,
        opened: false,
      };
      result.push(newSection);
    });

    return result;
  }

  getOpened(section: MenuSection[]): guid[] {
    return this.getAllSections(section).reduce((acc, section) => {
      if ((<MenuSection>section).opened) {
        acc.push(section.id);
      }

      return acc;
    }, []);
  }

  reestablishOpened(sections: MenuSection[], opened: guid[]): MenuSection[] {
    for (const section of sections) {
      if (opened.some((id) => id === section.id)) {
        section.opened = true;
      } else {
        section.opened = false;
      }
      if (section.sections && section.sections.length) {
        this.reestablishOpened(section.sections, opened);
      }
    }

    return sections;
  }

  sectionFormToSection(form: SectionForm): Section {
    return {
      id: UtilService.guid(),
      sections: [],
      items: [],
      color: form.color,
      name: form.name,
    };
  }

  itemFormToItem(form: ItemForm): Item {
    return {
      id: UtilService.guid(),
      name: form.name,
      sale: form.sale,
    };
  }

  getParent(sections: Section[], id: guid, parent = null): Section {
    for (const section of sections) {
      if (section.id === id) {
        return parent;
      } else {
        if (section.sections && section.sections) {
          const parent = this.getParent(section.sections, id, section);
          if (parent) {
            return parent;
          }
        }
      }
    }

    return null;
  }

  getItem(sections: Section[], id: guid): Item {
    for (const section of sections) {
      const founded = section.items.find((item) => item.id === id);
      if (founded) {
        return founded;
      } else {
        const founded = this.getItem(section.sections, id);
        if (founded) {
          return founded;
        }
      }
    }

    return null;
  }

  getItemSection(sections: Section[], id: guid): Section {
    for (const section of sections) {
      const founded = section.items.find((item) => item.id === id);
      if (founded) {
        return section;
      } else {
        const founded = this.getItemSection(section.sections, id);
        if (founded) {
          return founded;
        }
      }
    }

    return null;
  }

  up(sections: Section[], id: guid) {
    const founded = this.findSectionIndex(sections, id);
    if (founded.index > 0) {
      const section = founded.parent[founded.index];
      founded.parent.splice(founded.index, 1);
      founded.parent.splice(founded.index - 1, 0, section);
    }
  }

  down(sections: Section[], id: guid) {
    const founded = this.findSectionIndex(sections, id);
    if (founded.index < founded.parent.length - 1) {
      const section = founded.parent[founded.index];
      founded.parent.splice(founded.index, 1);
      founded.parent.splice(founded.index + 1, 0, section);
    }
  }

}
