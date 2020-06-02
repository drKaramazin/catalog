import { Component, Input, OnInit, HostBinding } from '@angular/core';

import { Section } from '../../models/section';

@Component({
  selector: 'app-section',
  templateUrl: './section.component.html',
  styleUrls: ['./section.component.scss']
})
export class SectionComponent implements OnInit {

  @Input() section: Section;
  @Input() depth: number;

  marginLeft: string;

  constructor() { }

  ngOnInit(): void {
    this.marginLeft = `${this.depth * 41}`;
  }

}
