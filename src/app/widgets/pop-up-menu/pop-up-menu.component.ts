import { Component, Input, OnInit } from '@angular/core';

import { MenuItem } from './menu-item';

@Component({
  selector: 'app-pop-up-menu',
  templateUrl: './pop-up-menu.component.html',
  styleUrls: ['./pop-up-menu.component.scss']
})
export class PopUpMenuComponent implements OnInit {

  @Input() items: MenuItem[];

  constructor() { }

  ngOnInit(): void {
  }

}
