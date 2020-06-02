import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { StoreService } from './store.service';
import { DataService } from './data.service';
import { Section } from '../models/section';
import { MenuSection } from '../models/menu-section';
import { guid } from '../models/guid';
import { Item } from '../models/item';
import { SectionService } from './section.service';
import { SectionForm } from '../models/section-form';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FoundedSection } from '../models/founded-section';
import { ItemForm } from '../models/item-form';
import { filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  private inited = new BehaviorSubject<boolean>(false);
  private sections = new BehaviorSubject<Section[]>(null);
  private opened: guid[] = [];

  menu = new BehaviorSubject<MenuSection[]>([]);

  constructor(
    private store: StoreService,
    private dataService: DataService,
    private sectionService: SectionService,
  ) {}

  init(): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      if (!this.inited.value) {
        this.sections.pipe(filter(val => !!val)).subscribe((val) => {
          let sections = this.sectionService.sectionToMenuSection(val);
          sections = this.sectionService.reestablishOpened(sections, this.opened);
          this.menu.next(sections);
          this.store.write(val);
        });

        const sections = this.store.read();
        if (sections) {
          this.sections.next(sections);
          resolve();
        } else {
          this.dataService.read()
            .subscribe((sections) => {
              this.sections.next(
                this.dataService.dataSectionToSection(sections)
              );
              resolve();
            }, (error) => reject(error));
        }

        this.inited.next(true);
      } else {
        reject('The menu was initialized');
      }
    });
  }

  flip(id: guid) {
    const section = this.sectionService.findSection(this.menu.value, id) as MenuSection;
    section.opened = !section.opened;
  }

  getAllSections(): Section[] {
    return this.sectionService.getAllSections(this.menu.value);
  }

  private saveOpened() {
    this.opened = this.sectionService.getOpened(this.menu.value);
  }

  deleteSection(id: guid) {
    this.saveOpened();
    const sections = this.sections.value.slice();
    const founded = this.sectionService.findSectionIndex(sections, id);
    if (founded) {
      founded.parent.splice(founded.index, 1);
      this.sections.next(sections);
    }
  }

  deleteItem(id: guid) {
    this.saveOpened();
    const sections = this.sections.value.slice();
    const founded = this.sectionService.findItemIndex(sections, id);
    if (founded) {
      founded.parent.splice(founded.index, 1);
      this.sections.next(sections);
    }
  }

  addSection(form: SectionForm) {
    this.saveOpened();
    const sections = this.sections.value.slice();
    const founded = this.sectionService.findSectionIndex(sections, form.section);
    if (founded) {
      founded.parent[founded.index].sections.unshift(this.sectionService.sectionFormToSection(form));
    } else {
      sections.unshift(this.sectionService.sectionFormToSection(form));
    }
    this.sections.next(sections);
  }

  getSection(id: guid): FoundedSection {
    return this.sectionService.findSectionIndex(this.menu.value, id);
  }

  getSectionForm(form: SectionForm): { [key: string]: any } {
    return {
      name: new FormControl(form.name, [Validators.required, Validators.minLength(3)]),
      section: new FormControl(form.section, []),
      color: new FormControl(form.color, []),
    };
  }

  getItemForm(form: ItemForm): { [key: string]: any } {
    return {
      name: new FormControl(form.name, [Validators.required, Validators.minLength(3)]),
      sale: new FormControl(form.sale, [Validators.required, Validators.min(0)]),
      section: new FormControl(form.section, [Validators.required]),
    };
  }

  getParent(id: guid): Section {
    return this.sectionService.getParent(this.sections.value, id);
  }

  editSection(id: guid, form: SectionForm) {
    this.saveOpened();
    const sections = this.sections.value.slice();
    const founded = this.sectionService.findSectionIndex(sections, id);
    if (founded) {
      founded.parent[founded.index].name = form.name;
      founded.parent[founded.index].color = form.color;
      const parent = this.sectionService.getParent(sections, id);
      if (parent) {
        if (!form.section) {
          const section = founded.parent[founded.index];
          founded.parent.splice(founded.index, 1);
          sections.unshift(section);
        } else if (form.section !== parent.id) {
          const section = founded.parent[founded.index];
          founded.parent.splice(founded.index, 1);
          const newParent = this.sectionService.findSection(sections, form.section);
          newParent.sections.unshift(section);
        }
      } else {
        if (form.section) {
          const index = sections.findIndex((section) => section.id === id);
          const section = sections[index];
          sections.splice(index, 1);
          const newParent = this.sectionService.findSection(sections, form.section);
          newParent.sections.unshift(section);
        }
      }
    }
    this.sections.next(sections);
  }

  addItem(form: ItemForm) {
    this.saveOpened();
    const sections = this.sections.value.slice();
    const founded = this.sectionService.findSectionIndex(sections, form.section);
    if (founded) {
      founded.parent[founded.index].items.unshift(this.sectionService.itemFormToItem(form));
      this.sections.next(sections);
    }
  }

  getItem(id: guid): Item {
    return this.sectionService.getItem(this.sections.value, id);
  }

  getItemSection(id: guid): Section {
    return this.sectionService.getItemSection(this.sections.value, id);
  }

  editItem(id: guid, form: ItemForm) {
    this.saveOpened();
    const sections = this.sections.value.slice();
    const founded = this.sectionService.findItemIndex(sections, id);
    if (founded) {
      founded.parent[founded.index].name = form.name;
      founded.parent[founded.index].sale = form.sale;
      const section = this.sectionService.getItemSection(sections, id);
      if (section.id !== form.section) {
        const item = founded.parent[founded.index];
        founded.parent.splice(founded.index);
        const newSection = this.sectionService.findSectionIndex(sections, form.section);
        newSection.parent[newSection.index].items.unshift(item);
      }
      this.sections.next(sections);
    }
  }

  canUp(id: guid): boolean {
    const founded = this.sectionService.findSectionIndex(this.sections.value, id);
    return founded.index > 0;
  }

  canDown(id: guid): boolean {
    const founded = this.sectionService.findSectionIndex(this.sections.value, id);
    return founded.index < founded.parent.length - 1;
  }

  up(id: guid) {
    this.saveOpened();
    const sections = this.sections.value.slice();
    this.sectionService.up(sections, id);
    this.sections.next(sections);
  }

  down(id: guid) {
    this.saveOpened();
    const sections = this.sections.value.slice();
    this.sectionService.down(sections, id);
    this.sections.next(sections);
  }

}
