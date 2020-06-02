import { Component, Input, OnInit } from '@angular/core';

import { Item } from '../../models/item';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class ItemComponent implements OnInit {

  @Input() item: Item;
  @Input() depth: number;

  marginLeft: string;

  constructor() { }

  ngOnInit(): void {
    this.marginLeft = `${this.depth * 41}`;
  }

}
