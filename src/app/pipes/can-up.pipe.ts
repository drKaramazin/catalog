import { Pipe, PipeTransform } from '@angular/core';

import { MenuService } from '../services/menu.service';
import { Section } from '../models/section';

@Pipe({
  name: 'canUp'
})
export class CanUpPipe implements PipeTransform {

  constructor(
    private menuService: MenuService,
  ) {
  }

  transform(section: Section): boolean {
    return this.menuService.canUp(section.id);
  }

}
