import { Component, Input, OnInit } from '@angular/core';

import { MenuItem } from '../pop-up-menu/menu-item';
import { Item } from '../../models/item';
import { MenuService } from '../../services/menu.service';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class ItemComponent implements OnInit {

  menuItems: MenuItem[] = [];

  @Input() item: Item;
  @Input() depth: number;

  paddingLeft: string;

  constructor(
    private menuService: MenuService,
  ) { }

  ngOnInit(): void {
    this.paddingLeft = `${this.depth * 41}`;

    this.menuItems = [{
      label: 'Редактировать',
      link: `/edit-item/${this.item.id}`,
      cssClass: 'fas fa-edit'
    }, {
      label: 'Удалить',
      holder: this.deleteItem.bind(this),
      cssClass: 'far fa-trash-alt'
    }];
  }

  deleteItem() {
    this.menuService.deleteItem(this.item.id);
  }

}
