import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { MenuSection } from '../../models/menu-section';
import { SectionForm } from '../../models/section-form';
import { MenuService } from '../../services/menu.service';

@Component({
  selector: 'app-section-form',
  templateUrl: './section-form.component.html',
  styleUrls: ['./section-form.component.scss']
})
export class SectionFormComponent implements OnInit {

  sections: MenuSection[];

  showErrors = false;

  @Input() formGroup : FormGroup;
  @Input() title: string;

  @Output() onSubmit = new EventEmitter<SectionForm>();

  constructor(
    private menuService: MenuService,
  ) { }

  getSections() {
    this.sections = [{
      name: 'Основной - первый уровень',
      id: null,
      sections: [],
      opened: false,
      items: [],
      color: null,
    }]
    const sections: MenuSection[] = <MenuSection[]>this.menuService.getAllSections();
    if (sections && sections.length) {
      this.sections = this.sections.slice().concat(sections);
    }
  }

  ngOnInit(): void {
    this.getSections();
  }

  submit(value: SectionForm) {
    this.showErrors = true;
    if (this.formGroup.valid) {
      this.onSubmit.emit(value);
    }
  }

}
