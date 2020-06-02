import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { MenuSection } from '../../models/menu-section';
import { MenuService } from '../../services/menu.service';
import { ItemForm } from '../../models/item-form';

@Component({
  selector: 'app-item-form',
  templateUrl: './item-form.component.html',
  styleUrls: ['./item-form.component.scss']
})
export class ItemFormComponent implements OnInit {

  sections: MenuSection[];

  showErrors = false;

  @Input() formGroup : FormGroup;
  @Input() title: string;

  @Output() onSubmit = new EventEmitter<ItemForm>();

  constructor(
    private menuService: MenuService,
  ) { }

  ngOnInit(): void {
    this.sections = <MenuSection[]>this.menuService.getAllSections();
  }

  submit(value: ItemForm) {
    this.showErrors = true;
    if (this.formGroup.valid) {
      this.onSubmit.emit(value);
    }
  }

}
