import { Component, Input, OnInit } from '@angular/core';

import { MenuSection } from '../../models/menu-section';
import { MenuService } from '../../services/menu.service';
import { MenuItem } from '../pop-up-menu/menu-item';

@Component({
  selector: 'app-section',
  templateUrl: './section.component.html',
  styleUrls: ['./section.component.scss']
})
export class SectionComponent implements OnInit {

  @Input() section: MenuSection;
  @Input() depth: number;

  paddingLeft: string;

  menuItems: MenuItem[] = [];

  constructor(
    private menuService: MenuService,
  ) { }

  ngOnInit(): void {
    this.paddingLeft = `${this.depth * 41}`;

    this.menuItems = [{
      label: 'Добавить позицию',
      link: `/add-item/${this.section.id}`,
      cssClass: 'fas fa-plus'
    }, {
      label: 'Добавить раздел',
      link: `/add-section/${this.section.id}`,
      cssClass: 'fas fa-plus'
    }, {
      label: 'Редактировать',
      link: `/edit-section/${this.section.id}`,
      cssClass: 'fas fa-edit'
    }, {
      label: 'Удалить',
      holder: this.deleteSection.bind(this),
      cssClass: 'far fa-trash-alt'
    }];
  }

  flip() {
    this.menuService.flip(this.section.id);
  }

  deleteSection() {
    this.menuService.deleteSection(this.section.id);
  }

  up() {
    this.menuService.up(this.section.id);
  }

  down() {
    this.menuService.down(this.section.id);
  }

}
