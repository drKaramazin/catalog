import { Component, forwardRef, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import { COLORS } from '../../models/colors';

@Component({
  selector: 'app-color',
  templateUrl: './color.component.html',
  styleUrls: ['./color.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => ColorComponent),
    multi: true,
  }],
})
export class ColorComponent implements ControlValueAccessor {

  COLORS = COLORS;

  value: string;

  propagateChange = (_: any) => {};

  constructor() { }

  ngOnInit(): void {
  }

  registerOnChange(fn) {
    this.propagateChange = fn;
  }

  registerOnTouched() {}

  writeValue(value: any) {
    this.value = value;
  }

  choose(color: string) {
    this.value = color;
    this.propagateChange(this.value);
  }

}
