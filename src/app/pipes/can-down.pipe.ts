import { Pipe, PipeTransform } from '@angular/core';

import { MenuService } from '../services/menu.service';
import { Section } from '../models/section';

@Pipe({
  name: 'canDown'
})
export class CanDownPipe implements PipeTransform {

  constructor(
    private menuService: MenuService,
  ) {
  }

  transform(section: Section): boolean {
    return this.menuService.canDown(section.id);
  }

}
